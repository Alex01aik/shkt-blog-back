import { Injectable, OnModuleInit } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../../prisma/prisma.service';
import { UserRole } from '@prisma/client';

@Injectable()
export class AuthSeedService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    const admin = await this.prisma.user.findFirst({
      where: {
        email: {
          equals: 'admin@admin.com',
        },
      },
    });
    if (!admin) {
      const hashedPassword = await bcrypt.hash('admin', 10);
      await this.prisma.user.create({
        data: {
          id: '00000000-0000-0000-0000-000000000000',
          email: 'admin@admin.com',
          password: hashedPassword,
          role: UserRole.Admin,
        },
      });
    }
  }
}
