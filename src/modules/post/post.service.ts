import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { FindManyPostArgs } from './graphql/args/FindManyPostArgs';
import { CreateOnePostArgs } from './graphql/args/CreateOnePostArgs';
import { SuccessOutput } from 'src/common/graphql/output/SuccessOutput';
import { FindManyLocalePostArgs } from './graphql/args/FindManyLocalePostArgs';
import { UpdateOnePostArgs } from './graphql/args/UpdateOnePostArgs';
import { UniqueArgs } from 'src/common/graphql/args/UniqueArgs';
import { FindOneLocalePostArgs } from './graphql/args/FindOneLocalePostArgs';
import { KeyArgs } from 'src/common/graphql/args/KeyArgs';
import { FindOneLocalePostByKeyArgs } from './graphql/args/FindOneLocalePostByKeyArgs';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(args: FindManyPostArgs) {
    return await this.prisma.post.findMany({
      select: {
        id: true,
        key: true,
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
      take: args.take,
      skip: args.skip,
    });
  }

  async findOne(args: UniqueArgs) {
    return await this.prisma.post.findUnique({
      where: {
        id: args.id,
      },
      select: {
        id: true,
        key: true,
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

  async findOneByKey(args: KeyArgs) {
    return await this.prisma.post.findUnique({
      where: {
        key: args.key,
      },
      select: {
        id: true,
        key: true,
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
        key: true,
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

  async findOneLocaleByKey(args: FindOneLocalePostByKeyArgs) {
    return await this.prisma.post.findUnique({
      where: {
        key: args.key,
      },
      select: {
        id: true,
        key: true,
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
      where: {
        localePosts: {
          some: {
            languageLang: {
              equals: args.lang,
            },
          },
        },
      },
      take: args.take,
      skip: args.skip,
      select: {
        id: true,
        key: true,
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

  // TODO optional
  titleFromContent(content: string) {
    const regex = /<h1>(.*?)<\/h1>/;
    const match = content.match(regex);

    return match ? match[1] : '';
  }

  async createOne(data: CreateOnePostArgs): Promise<SuccessOutput> {
    const localePosts = data.localePosts.map((item) => {
      return {
        title: item.title,
        body: item.body,
        languageLang: item.languageLang,
      };
    });
    await this.prisma.post.create({
      data: {
        key: data.key,
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
    const oldPostData = await this.findOne({ id: data.id });

    const newLocalePosts = data.localePosts.filter(
      (item) =>
        !oldPostData.localePosts.some(
          (locPost) => locPost.languageLang === item.languageLang,
        ),
    );

    const localePostsData = data.localePosts.map((item) => ({
      data: {
        title: item.title,
        body: item.body,
      },
      where: {
        languageLang: item.languageLang,
      },
    }));

    await this.prisma.$transaction(async (prisma) => {
      await prisma.post.update({
        where: {
          id: data.id,
        },
        data: {
          key: data.key,
          localePosts: {
            updateMany: localePostsData,
          },
        },
      });
      await this.prisma.localePost.createMany({
        data: newLocalePosts.map((item) => ({ ...item, postId: data.id })),
      });
    });

    return { success: true };
  }
}
