import { ArgsType, Field } from '@nestjs/graphql';
import { IsInt } from '@nestjs/class-validator';

@ArgsType()
export class GetUserArgs {
  @Field()
  @IsInt()
  id: number;
}