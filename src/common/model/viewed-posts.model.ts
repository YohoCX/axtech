import { Field, ObjectType } from '@nestjs/graphql';
import { PostModel } from '../../modules/posts/model/post.model';

@ObjectType()
export class ViewedPostsModel {
  @Field(() => Number)
  userId: number;

  @Field(() => Number)
  postId: number;

  @Field(() => PostModel)
  post: PostModel;
}