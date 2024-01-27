// Import necessary modules and types from external sources
import _ from 'lodash';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, ValidateNested } from 'class-validator';

import { Anime, Status as AnimeStatus, Type as AnimeType } from 'types/anime';

// DTO (Data Transfer Object) class for handling requests to get newest anime
export class NewestRequestDto {

    // Decorators from class-transformer and class-validator for validation and transformation
    @Type(() => Number)
    @IsInt()
    public readonly offset: number;

    @Type(() => Number)
    @IsInt()
    public readonly size: number;

    // Decorators for validating and transforming an array of anime types
    @Type(() => Array<AnimeType>)
    @ValidateNested()
    @IsOptional()
    public readonly types?: Array<AnimeType> = [];

    // Decorators for validating and transforming an array of anime statuses
    @Type(() => Array<AnimeStatus>)
    @ValidateNested()
    @IsOptional()
    public readonly statuses?: Array<AnimeStatus> = [];
}

// Interface for defining the response format for the newest anime endpoint
export interface GetNewestResponse {
    data: Array<Anime>,  // Array of newest anime
    total: number,        // Total number of anime in the response
}
