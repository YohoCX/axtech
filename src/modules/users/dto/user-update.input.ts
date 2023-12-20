import { Field, InputType } from '@nestjs/graphql';
import { UserRole } from '@prisma/client';

@InputType()
export class UserUpdateInput {
  @Field(() => Number)
  id: number;

  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => String, { nullable: true })
  role: UserRole;

  @Field(() => String, { nullable: true })
  password: string;
}