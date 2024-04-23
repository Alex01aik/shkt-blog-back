import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class FindManyArgs {
  @Field({ nullable: true, defaultValue: 10 })
  take?: number;

  @Field({ nullable: true, defaultValue: 0 })
  skip?: number;
}
