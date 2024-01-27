// Import necessary modules and types from external sources
import _ from 'lodash';
import { plainToInstance } from 'class-transformer';

// Import decorators and modules from Nest.js
import { Controller, Get, Query } from '@nestjs/common';
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

// Import types from 'types/anime' and the AnimeService
import { Status as AnimeStatus, Type as AnimeType } from 'types/anime';
import { AnimeService } from 'services/anime.service';

// Import DTO and response type from the same file
import { NewestRequestDto, GetNewestResponse } from './newest.dto';

// Injectable decorator marks this class as a provider that can be injected into other components
@Injectable()
export class NewestTransformPipe implements PipeTransform {
  // Transform method to apply transformation to the DTO using class-transformer
  async transform(dto: NewestRequestDto, { metatype }: ArgumentMetadata) {
    // Check if metatype is provided
    if (!metatype) {
      return dto;
    }

    // Use plainToInstance to transform DTO based on the provided metatype
    return plainToInstance(metatype, dto);
  }
}

// Controller for handling newest anime-related endpoints
@Controller('newest')
export class NewestController {

  // Constructor with injected AnimeService
  constructor(
    private readonly animeService: AnimeService,
  ) { }

  // Endpoint to get available anime statuses
  @Get('statuses')
  getStatuses(): Array<AnimeStatus> {
    // Return a predefined array of anime statuses
    return ['FINISHED', 'ONGOING', 'UPCOMING', 'UNKNOWN'];
  }

  // Endpoint to get available anime types
  @Get('types')
  getTypes(): Array<AnimeType> {
    // Return a predefined array of anime types
    return ['TV', 'MOVIE', 'OVA', 'ONA', 'SPECIAL', 'UNKNOWN'];
  }

  // Endpoint to get the newest anime based on query parameters
  @Get()
  getNewest(
    @Query(new NewestTransformPipe()) query: NewestRequestDto,
  ): GetNewestResponse {

    // Calculate the start and stop indices for paginating through the results
    const split = {
      start: (query.offset - 1) * query.size,
      stop: ((query.offset - 1) * query.size) + query.size,
    }

    // Retrieve all occurrences of anime that match the specified criteria
    const occurrences = this.animeService.getAnime()
      .filter(anime => {
        // Filter by the current year and season
        return anime.animeSeason.year === AnimeService.getCurrentYear()
          && anime.animeSeason.season === AnimeService.getCurrentSeason()
      })
      .filter(anime => {
        // Exclude anime with the 'hentai' tag, unknown type, and unknown status
        return !_.includes(anime.tags, 'hentai')
          && !_.includes(anime.type, "UNKNOWN")
          && !_.includes(anime.status, "UNKNOWN")
      })
      .filter(anime => {
        // Filter based on anime types and statuses
        return AnimeService.filterTypesStatus(anime, query.types, query.statuses)
      });

    // Return a paginated subset of the occurrences and the total count
    return {
      data: occurrences.slice(split.start, split.stop),
      total: occurrences.length
    }
  }
}
