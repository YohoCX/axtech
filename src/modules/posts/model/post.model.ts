import { UserModel } from '../../users/model/user.model';
import { Post } from '@prisma/client';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PostsViewersModel } from '../../../common/model/posts-viewers.model';

//TODO: Create/Modify explicit Models for each crud operation
@ObjectType()
export class PostModel {
  @Field(() => Int)
  id: Post['id'];

  @Field(() => Int)
  userId: Post['userId'];

  @Field(() => String)
  title: Post['title'];

  @Field(() => String)
  content: Post['content'];

  @Field(() => Date)
  createdAt: Post['createdAt'];

  @Field(() => Date)
  updatedAt: Post['updatedAt'];

  @Field(() => UserModel)
  author?: UserModel;

  @Field(() => [ PostsViewersModel ])
  postViews?: PostsViewersModel[];
}