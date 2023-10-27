import { Field, ArgsType } from '@nestjs/graphql';
import { FindManyArgs } from 'src/common/graphql/args/FindManyArgs';

@ArgsType()
export class FindManyLocalePostArgs extends FindManyArgs {
  @Field()
  lang: string;
}
