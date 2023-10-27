import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

const seedLangData = [
  {
    lang: 'en',
  },
  {
    lang: 'ru',
  },
  {
    lang: 'ua',
  },
];

@Injectable()
export class LanguageSeedService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    const langs = await this.prisma.language.findMany();
    if (!langs.length) {
      await this.prisma.language.createMany({
        data: seedLangData,
      });
    }
  }
}
