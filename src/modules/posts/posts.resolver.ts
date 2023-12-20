import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { PostModel } from './model/post.model';
import { GetPostArgs } from './dto/get-post.args';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { ListPostsArgs } from './dto/list-posts.args';
import { PostCreateInput } from './dto/post-create.input';

@UseGuards(AuthGuard)
@Resolver()
export class PostsResolver {
  constructor( private readonly postsService: PostsService ) {
  }

  @Query(() => PostModel, { name: 'post', nullable: false })
  async getPost( @Args() getPostArg: GetPostArgs, @Context() context: any ): Promise<PostModel> {
    const user = context.req.user;
    return await this.postsService.getOne(getPostArg, user.id);
  }

  @Query(() => [ PostModel ], { name: 'posts', nullable: false })
  async getPosts( @Args() getPostArg: ListPostsArgs ): Promise<PostModel[]> {
    return this.postsService.findMany(getPostArg);
  }

  @Mutation(() => PostModel, { name: 'createPost', nullable: false })
  async createPost( @Args('data') createInput: PostCreateInput, @Context() context: any ): Promise<PostModel> {
    const user = context.req.user;
    return await this.postsService.create(createInput, user.id);
  }

  @Mutation(() => PostModel, { name: 'deletePost', nullable: false })
  async deletePost( @Args('id') id: number ): Promise<PostModel> {
    return this.postsService.delete(id);
  }
}