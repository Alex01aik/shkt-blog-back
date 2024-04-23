import { Field, ArgsType, InputType } from '@nestjs/graphql';

@ArgsType()
export class CreateOnePostArgs {
  @Field()
  key: string;

  @Field(() => [LocalePostInput])
  localePosts: LocalePostInput[];
}

@InputType()
export class LocalePostInput {
  @Field()
  title: string;

  @Field()
  languageLang: string;

  @Field()
  body: string;
}
