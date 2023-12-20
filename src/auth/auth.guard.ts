import {
  applyDecorators,
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UsersRepository } from '../modules/users/users.repository';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@prisma/client';
import { ConsumerJwtService } from '../common/consumer-jwt/consumer-jwt.service';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: ConsumerJwtService,
    private readonly usersRepository: UsersRepository,
    private readonly reflector: Reflector,
  ) {
  }

  async canActivate( context: ExecutionContext ): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);

    const req: Request = ctx.getContext().req;

    const token = this.extractTokenFromHeader(req.headers.authorization);

    if ( !token ) {
      throw new UnauthorizedException();
    }

    const { id } = await this.jwtService.customVerify(token);

    if ( !id ) {
      throw new UnauthorizedException();
    }

    const user = await this.usersRepository.getOne({ where: { id } });

    if ( !user ) {
      throw new UnauthorizedException();
    }

    const user_role = this.reflector.getAllAndOverride<UserRole | undefined>('user_role', [
      context.getHandler(),
      context.getClass(),
    ]);

    if ( user_role && user.role !== user_role ) {
      throw new UnauthorizedException();
    }

    req['user'] = { id, role: user.role };

    return true;
  }

  private extractTokenFromHeader( headerAuth: string ): string | undefined {
    const [ type, token ] = headerAuth.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

}

export function GuardWithMetadata( role?: UserRole ) {
  return applyDecorators(SetMetadata('user_role', role), UseGuards(AuthGuard));
}