import { Field, ArgsType, InputType } from '@nestjs/graphql';

@ArgsType()
export class CreateOnePostArgs {
  @Field(() => [LocalePostInput])
  localePosts: LocalePostInput[];
}

@InputType()
export class LocalePostInput {
  @Field()
  lang: string;

  @Field()
  content: string;
}
