import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt } from '@nestjs/class-validator';

@ArgsType()
export class GetPostArgs {
@Field(() => Int, { nullable: false })
  @IsInt()
  id: number;
}