import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOneUserArgs } from './graphql/args/CreateOneUserArgs';
import { UpdateOneUserArgs } from './graphql/args/UpdateOneUserArgs';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
  async create(data: CreateOneUserArgs) {
    const isExist = await this.findByUsername(data.email);
    if (isExist) {
      throw new BadRequestException('User already existed');
    }

    return await this.prisma.user.create({
      data,
    });
  }

  async delete(id: string) {
    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async update(data: UpdateOneUserArgs) {
    return await this.prisma.user.update({
      where: {
        id: data.id,
      },
      data,
    });
  }

  async findByUsername(email: string) {
    return await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }
}
