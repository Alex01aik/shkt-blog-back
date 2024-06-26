import { Field, ArgsType } from '@nestjs/graphql';
import { LocalePostInput } from './CreateOnePostArgs';
import { UniqueArgs } from 'src/common/graphql/args/UniqueArgs';

@ArgsType()
export class UpdateOnePostArgs extends UniqueArgs {
  @Field()
  key: string;

  @Field(() => [LocalePostInput])
  localePosts: LocalePostInput[];
}
