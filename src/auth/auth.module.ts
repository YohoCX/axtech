import { Module } from '@nestjs/common';
import { UsersModule } from '../modules/users/users.module';
import { ConsumerJwtModule } from '../common/consumer-jwt/consumer-jwt.module';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [
    ConsumerJwtModule,
    UsersModule,
  ],
  providers:[AuthService, AuthResolver]
})
export class AuthModule {
}