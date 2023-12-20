import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PostCreateInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;
}