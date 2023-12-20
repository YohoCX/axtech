import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../modules/users/users.service';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/sign-in.dto';
import { ConsumerJwtService } from '../common/consumer-jwt/consumer-jwt.service';

@Injectable()
export class AuthService {
  constructor( private readonly jwtService: ConsumerJwtService, private readonly userService: UsersService ) {
  }

  async signIn( userCredentialsDto: SignInDto ): Promise<any> {
    const user = await this.userService.getUser({ id: 2 });

    if ( !user ) {
      throw new UnauthorizedException();
    }

    const isPasswordValid = await bcrypt.compare(userCredentialsDto.password, user.password);

    console.log(isPasswordValid, userCredentialsDto.password, user.password);

    if ( !isPasswordValid ) {
      throw new UnauthorizedException();
    }

    const accessToken = await this.jwtService.createAccessToken(user.id);
    const refreshToken = await this.jwtService.createRefreshToken(user.id);

    return { accessToken: accessToken, refreshToken: refreshToken };
  }
}