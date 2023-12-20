import { Injectable } from '@nestjs/common';
import { PostsRepository } from './posts.repository';
import { PostCreateInput } from './dto/post-create.input';
import { GetPostArgs } from './dto/get-post.args';
import { PrismaService } from '../../common/prisma/prisma.service';
import { ListPostsArgs } from './dto/list-posts.args';

@Injectable()
export class PostsService {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly prisma: PrismaService,
  ) {
  }

  async create( params: PostCreateInput, userId: number ) {
    const data = {
      ...params,
      userId: userId,
    };
    return this.postsRepository.create({ data });
  }

  async getOne( params: GetPostArgs, userId: number ) {
    const watched = await this.prisma.postViews.findFirst({
      where: { postId: params.id, userId },
    });

    if ( watched == null ) {
      console.log('watched');
      await this.prisma.post.update({
        where: { id: params.id },
        data: { postViews: { create: { userId } } },
      });
    }

    return this.postsRepository.getOne({ where: { id: params.id } });
  }

  async findMany( ListPostsArgs: ListPostsArgs ) {
    if ( ListPostsArgs.cursor == null ) {
      return this.postsRepository.findMany({
        take: ListPostsArgs.take,
      });
    }
    return this.postsRepository.findMany({
      cursor: { id: ListPostsArgs.cursor },
      take: ListPostsArgs.take,
    });
  }

  async delete( id: number ) {
    return this.postsRepository.delete({ id: id });
  }
}