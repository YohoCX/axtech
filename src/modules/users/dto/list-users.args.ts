import { ArgsType, Field } from '@nestjs/graphql';
import { IsEmail, IsEnum, IsInt, IsOptional } from '@nestjs/class-validator';
import { UserRole } from '@prisma/client';

@ArgsType()
export class ListUsersArgs {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  @IsInt()
  limit?: number;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  @IsInt()
  offset?: number;
}