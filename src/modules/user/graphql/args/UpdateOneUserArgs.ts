import { Field, ArgsType, registerEnumType } from '@nestjs/graphql';
import { UserRole } from '@prisma/client';
import { IsUUID } from 'class-validator';

registerEnumType(UserRole, {
  name: 'UserRole',
});

@ArgsType()
export class UpdateOneUserArgs {
  @IsUUID()
  @Field()
  id: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  password?: string;

  @Field(() => UserRole, { nullable: true })
  role?: UserRole;
}
