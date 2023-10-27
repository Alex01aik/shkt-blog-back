import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Lang {
  @Field()
  lang: string;

  @Field({ nullable: true })
  fullLang: string;

  @Field({ nullable: true })
  alternativeLang: string;
}
