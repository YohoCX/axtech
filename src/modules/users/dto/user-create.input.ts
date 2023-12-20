import { Field, InputType } from '@nestjs/graphql';
import { UserRole } from '@prisma/client';

@InputType()
export class UserCreateInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  role: UserRole;

  @Field(() => String)
  password: string;
}