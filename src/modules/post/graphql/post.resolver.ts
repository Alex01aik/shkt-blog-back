import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PostService } from '../post.service';
import { SuccessOutput } from 'src/common/graphql/output/SuccessOutput';
import { Post } from './outputs/Post';
import { FindManyPostArgs } from './args/FindManyPostArgs';
import { CreateOnePostArgs } from './args/CreateOnePostArgs';
import { FindManyLocalePostArgs } from './args/FindManyLocalePostArgs';
import { UpdateOnePostArgs } from './args/UpdateOnePostArgs';
import { UniqueArgs } from 'src/common/graphql/args/UniqueArgs';
import { FindOneLocalePostArgs } from './args/FindOneLocalePostArgs';
import { UseGuards } from '@nestjs/common';
import { RoleGuard } from 'src/modules/auth/guard/role.guard';
import { Roles } from 'src/modules/auth/utils/RolesDecorator';
import { UserRole } from '@prisma/client';

@Resolver('Post')
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => [Post], { nullable: true })
  async findManyPost(@Args() args: FindManyPostArgs): Promise<Post[]> {
    return await this.postService.findMany(args);
  }

  @Query(() => Post, { nullable: true })
  async findOnePost(@Args() args: UniqueArgs): Promise<Post> {
    return await this.postService.findOne(args);
  }

  @Query(() => Post, { nullable: true })
  async findOneLocalePost(@Args() args: FindOneLocalePostArgs): Promise<Post> {
    return await this.postService.findOneLocale(args);
  }

  @UseGuards(RoleGuard)
  @Roles(UserRole.Admin)
  @Mutation(() => SuccessOutput, { nullable: true })
  async deleteOnePost(@Args() args: UniqueArgs): Promise<SuccessOutput> {
    return await this.postService.deleteOne(args);
  }

  @Query(() => [Post], { nullable: true })
  async findManyLocalePost(
    @Args() args: FindManyLocalePostArgs,
  ): Promise<Post[]> {
    return await this.postService.findManyLocale(args);
  }

  @UseGuards(RoleGuard)
  @Roles(UserRole.Admin)
  @Mutation(() => SuccessOutput)
  async createOnePost(@Args() args: CreateOnePostArgs): Promise<SuccessOutput> {
    console.log('createOnePost', args);
    return await this.postService.createOne(args);
  }

  @UseGuards(RoleGuard)
  @Roles(UserRole.Admin)
  @Mutation(() => SuccessOutput)
  async updateOnePost(@Args() args: UpdateOnePostArgs): Promise<SuccessOutput> {
    return await this.postService.updateOne(args);
  }
}
