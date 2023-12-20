import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsOptional } from '@nestjs/class-validator';

@ArgsType()
export class ListPostsArgs {
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  take?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  cursor?: number;
}