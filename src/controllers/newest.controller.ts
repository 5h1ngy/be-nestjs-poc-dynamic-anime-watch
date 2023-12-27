import _ from 'lodash';
import { plainToInstance, Type } from 'class-transformer';
import { IsInt, IsOptional, ValidateNested } from 'class-validator';

import { Controller, Get, Query } from '@nestjs/common';
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

import { Anime, Status as AnimeStatus, Type as AnimeType } from 'entities/anime'
import { AnimeService } from 'services/anime.service';

export class NewestRequestDto {

  @Type(() => Number)
  @IsInt()
  public readonly offset: number;

  @Type(() => Number)
  @IsInt()
  public readonly size: number;

  @Type(() => Array<AnimeType>)
  @ValidateNested()
  @IsOptional()
  public readonly types?: Array<AnimeType> = [];

  @Type(() => Array<AnimeStatus>)
  @ValidateNested()
  @IsOptional()
  public readonly statuses?: Array<AnimeStatus> = [];

}

@Injectable()
export class NewestTransformPipe implements PipeTransform {
  async transform(dto: NewestRequestDto, { metatype }: ArgumentMetadata) {
    if (!metatype) {
      return dto;
    }

    return plainToInstance(metatype, dto);
  }
}

interface getNewestResponse {
  data: Array<Anime>,
  total: number,
}

@Controller('newest')
export class NewestController {

  constructor(
    private readonly animeService: AnimeService,
  ) { }

  @Get('statuses')
  getStatuses(): Array<AnimeStatus> {
    // return ['FINISHED', 'ONGOING', 'UPCOMING', 'UNKNOWN']
    return ['FINISHED', 'ONGOING', 'UPCOMING']
  }

  @Get('types')
  getTypes(): Array<AnimeType> {
    // return ['TV', 'MOVIE', 'OVA', 'ONA', 'SPECIAL', 'UNKNOWN']
    return ['TV', 'MOVIE', 'OVA', 'ONA', 'SPECIAL']
  }

  @Get()
  getNewest(
    @Query(new NewestTransformPipe()) query: NewestRequestDto,
  ): getNewestResponse {

    const split = {
      start: (query.offset - 1) * query.size,
      stop: ((query.offset - 1) * query.size) + query.size,
    }
    const occurrences = this.animeService.getAnime()
      .filter(anime => {
        return anime.animeSeason.year === AnimeService.getCurrentYear()
          && anime.animeSeason.season === AnimeService.getCurrentSeason()
      })
      .filter(anime => {
        return !_.includes(anime.tags, 'hentai')
          && !_.includes(anime.type, "UNKNOWN")
          && !_.includes(anime.status, "UNKNOWN")
      })
      .filter(anime => {
        return AnimeService.filterTypesStatus(anime, query.types, query.statuses)
      });

    return {
      data: occurrences.slice(split.start, split.stop),
      total: occurrences.length
    }
  }
}
