import { Module } from '@nestjs/common';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';
import { PrismaModule } from '../../common/prisma/prisma.module';
import { AuthModule } from '../../auth/auth.module';
import { PostsRepository } from './posts.repository';
import { UsersModule } from '../users/users.module';

@Module({
  providers: [ PostsResolver, PostsService, PostsRepository ],
  imports: [ PrismaModule, AuthModule, UsersModule ],
  exports: [],
})
export class PostsModule {
}