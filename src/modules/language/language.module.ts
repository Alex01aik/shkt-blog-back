import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { LanguageSeedService } from './language.seed.service';
import { LanguageResolver } from './graphql/language.resolver';
import { LanguageService } from './language.service';

@Module({
  imports: [PrismaModule],
  providers: [LanguageSeedService, LanguageService, LanguageResolver],
})
export class LanguageModule {}
