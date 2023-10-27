import { Field, ArgsType } from '@nestjs/graphql';
import { UniqueArgs } from 'src/common/graphql/args/UniqueArgs';

@ArgsType()
export class FindOneLocalePostArgs extends UniqueArgs {
  @Field()
  lang: string;
}
