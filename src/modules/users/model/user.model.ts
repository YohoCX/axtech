import { User } from '@prisma/client';
import { PostModel } from '../../posts/model/post.model';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ViewedPostsModel } from '../../../common/model/viewed-posts.model';


//TODO: Create/Modify explicit Models for each crud operation
@ObjectType()
export class UserModel {
  @Field(() => Int)
  id: User['id'];

  @Field(() => String)
  name: User['name'];

  @Field(() => String)
  email: User['email'];

  @Field(() => String)
  password: User['password'];

  @Field(() => String)
  role: User['role'];

  @Field(() => Date)
  createdAt: User['createdAt'];

  @Field(() => Date)
  updatedAt: User['updatedAt'];

  @Field(() => [ PostModel ])
  posts?: PostModel[];

  @Field(() => [ ViewedPostsModel ])
  viewedPosts?: ViewedPostsModel[];
}