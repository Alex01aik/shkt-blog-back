import { Field, ArgsType, registerEnumType } from '@nestjs/graphql';
import { UserRole } from '@prisma/client';
import { IsEmail } from 'class-validator';

registerEnumType(UserRole, {
  name: 'UserRole',
});

@ArgsType()
export class CreateOneUserArgs {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  // TODO add validation
  password: string;

  @Field(() => UserRole, { nullable: true })
  role?: UserRole;
}
