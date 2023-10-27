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
          localePosts: {
            createMany: {
              data: [
                {
                  title: 'en test title',
                  body: 'en test body',
                  languageLang: 'en',
                },
                {
                  title: 'ua test title',
                  body: 'ua test body',
                  languageLang: 'ua',
                },
                {
                  title: 'ru test title',
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
