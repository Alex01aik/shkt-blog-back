import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserService } from '../user.service';
import { UpdateOneUserArgs } from './args/UpdateOneUserArgs';
import { UniqueArgs } from '../../../common/graphql/args/UniqueArgs';
import { UseGuards } from '@nestjs/common';
import { SuccessOutput } from 'src/common/graphql/output/SuccessOutput';
import { Roles } from '../../auth/utils/RolesDecorator';
import { RoleGuard } from '../../auth/guard/role.guard';
import { AllowOwner } from '../../auth/utils/AllowOwnerDecorator';
import { UserRole } from '@prisma/client';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @UseGuards(RoleGuard)
  @Roles(UserRole.Admin)
  @AllowOwner()
  @Mutation(() => SuccessOutput)
  async deleteOneUser(@Args() args: UniqueArgs): Promise<SuccessOutput> {
    await this.userService.delete(args.id);
    return { success: true };
  }

  @UseGuards(RoleGuard)
  @Roles(UserRole.Admin)
  @Mutation(() => SuccessOutput)
  async updateOneUser(@Args() args: UpdateOneUserArgs): Promise<SuccessOutput> {
    await this.userService.update(args);
    return { success: true };
  }
}
