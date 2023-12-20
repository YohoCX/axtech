import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IConsumerJwtPayload } from './consumer-jwt.types';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid4 } from 'uuid';

@Injectable()
export class ConsumerJwtService extends JwtService {
  constructor(
    private readonly config: ConfigService,
  ) {
    super({
      secret: 'JWTSECRET',
    });
  }

  async createAccessToken( userId: number ) {
    return this.sign({ id: userId }, { expiresIn: '15m' });
  }

  async createRefreshToken( userId: number ) {
    const tokenId = uuid4();
    return this.sign({ id: userId, tokenId: tokenId }, { expiresIn: '7d' });
  }

  async customVerify( token: string ): Promise<IConsumerJwtPayload> {
    const payload: IConsumerJwtPayload = await this.verifyAsync(token).catch(() => {
      throw new UnauthorizedException();
    });

    console.log(payload, "PAYLOAD")

    if ( !payload ) throw new UnauthorizedException();

    return payload;
  }
}
