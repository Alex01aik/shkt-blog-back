import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Post {
  @Field()
  id: string;

  @Field()
  key: string;

  @Field(() => [LocalePost])
  localePosts: LocalePost[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@ObjectType()
export class LocalePost {
  @Field()
  title: string;

  @Field()
  body: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  languageLang: string;
}
