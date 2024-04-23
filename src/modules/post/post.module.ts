import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { PostService } from './post.service';
import { PostResolver } from './graphql/post.resolver';
import { PostSeedService } from './post.seed.service';

@Module({
  imports: [PrismaModule],
  providers: [
    PostResolver,
    PostService,
    // PostSeedService
  ],
})
export class PostModule {}
