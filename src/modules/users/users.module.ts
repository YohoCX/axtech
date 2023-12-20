import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../../common/prisma/prisma.module';
import { ConsumerJwtModule } from '../../common/consumer-jwt/consumer-jwt.module';

@Module({
  providers: [ UsersResolver, UsersService, UsersRepository ],
  imports: [ ConfigModule, PrismaModule, ConsumerJwtModule ],
  exports: [ UsersService, UsersRepository ],
})
export class UsersModule {
}
