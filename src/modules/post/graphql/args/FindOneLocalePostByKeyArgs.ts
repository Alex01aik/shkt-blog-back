import { Field, ArgsType } from '@nestjs/graphql';
import { KeyArgs } from 'src/common/graphql/args/KeyArgs';

@ArgsType()
export class FindOneLocalePostByKeyArgs extends KeyArgs {
  @Field()
  lang: string;
}
