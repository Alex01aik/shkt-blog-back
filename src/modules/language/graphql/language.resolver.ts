import { Resolver, Query } from '@nestjs/graphql';
import { LanguageService } from '../language.service';
import { Lang } from './outputs/Lang';

@Resolver('Language')
export class LanguageResolver {
  constructor(private readonly langService: LanguageService) {}

  @Query(() => [Lang], { nullable: true })
  async findManyLangs(): Promise<Lang[]> {
    return this.langService.getAll();
  }
}
