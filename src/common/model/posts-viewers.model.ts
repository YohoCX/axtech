import { Field, ObjectType } from '@nestjs/graphql';
import { PostModel } from '../../modules/posts/model/post.model';
import { UserModel } from '../../modules/users/model/user.model';

@ObjectType()
export class PostsViewersModel {
  @Field(() => Number)
  userId: number;

  @Field(() => Number)
  postId: number;

  @Field(() => PostModel)
  user: UserModel;
}