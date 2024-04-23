import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class PostSeedService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    const posts = await this.prisma.post.findMany();
    if (!posts.length) {
      await this.prisma.post.create({
        data: {
          key: 'test_title',
          localePosts: {
            createMany: {
              data: [
                {
                  title: 'Eng TEST TITLE',
                  body: 'en test body',
                  languageLang: 'en',
                },
                {
                  title: 'UA TEST TITLE',
                  body: 'ua test body',
                  languageLang: 'ua',
                },
                {
                  title: 'RU TEST TITLE',
                  body: 'ru test body',
                  languageLang: 'ru',
                },
              ],
            },
          },
        },
      });
    }
  }
}
