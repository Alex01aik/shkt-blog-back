import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { FindManyPostArgs } from './graphql/args/FindManyPostArgs';
import { CreateOnePostArgs } from './graphql/args/CreateOnePostArgs';
import { SuccessOutput } from 'src/common/graphql/output/SuccessOutput';
import { FindManyLocalePostArgs } from './graphql/args/FindManyLocalePostArgs';
import { UpdateOnePostArgs } from './graphql/args/UpdateOnePostArgs';
import { UniqueArgs } from 'src/common/graphql/args/UniqueArgs';
import { FindOneLocalePostArgs } from './graphql/args/FindOneLocalePostArgs';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(args: FindManyPostArgs) {
    return await this.prisma.post.findMany({
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        localePosts: {
          select: {
            title: true,
            body: true,
            createdAt: true,
            updatedAt: true,
            languageLang: true,
          },
        },
      },
    });
  }

  async findOne(args: UniqueArgs) {
    return await this.prisma.post.findUnique({
      where: {
        id: args.id,
      },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        localePosts: {
          select: {
            title: true,
            body: true,
            createdAt: true,
            updatedAt: true,
            languageLang: true,
          },
        },
      },
    });
  }

  async findOneLocale(args: FindOneLocalePostArgs) {
    return await this.prisma.post.findUnique({
      where: {
        id: args.id,
      },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        localePosts: {
          where: {
            languageLang: {
              equals: args.lang,
            },
          },
          select: {
            title: true,
            body: true,
            createdAt: true,
            updatedAt: true,
            languageLang: true,
          },
        },
      },
    });
  }

  async findManyLocale(args: FindManyLocalePostArgs) {
    return await this.prisma.post.findMany({
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        localePosts: {
          where: {
            languageLang: {
              equals: args.lang,
            },
          },
          select: {
            title: true,
            body: true,
            createdAt: true,
            updatedAt: true,
            languageLang: true,
          },
        },
      },
    });
  }

  titleFromContent(content: string) {
    const regex = /<h1>(.*?)<\/h1>/;
    const match = content.match(regex);

    return match ? match[1] : '';
  }

  async createOne(data: CreateOnePostArgs): Promise<SuccessOutput> {
    const localePosts = data.localePosts.map((item) => {
      return {
        title: this.titleFromContent(item.content),
        body: item.content,
        languageLang: item.lang,
      };
    });
    await this.prisma.post.create({
      data: {
        localePosts: {
          createMany: {
            data: localePosts,
          },
        },
      },
    });
    return { success: true };
  }

  async deleteOne(args: UniqueArgs): Promise<SuccessOutput> {
    await this.prisma.post.delete({
      where: {
        id: args.id,
      },
    });
    return { success: true };
  }

  async updateOne(data: UpdateOnePostArgs): Promise<SuccessOutput> {
    const localePostsData = data.localePosts.map((item) => ({
      data: {
        body: item.content,
      },
      where: {
        languageLang: item.lang,
      },
    }));

    await this.prisma.post.update({
      where: {
        id: data.id,
      },
      data: {
        localePosts: {
          updateMany: localePostsData,
        },
      },
    });

    return { success: true };
  }
}
