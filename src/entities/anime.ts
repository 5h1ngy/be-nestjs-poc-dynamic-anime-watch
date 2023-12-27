export enum TypesList {
    TV = 'TV',
    MOVIE = 'MOVIE',
    OVA = 'OVA',
    ONA = 'ONA',
    SPECIAL = 'SPECIAL',
    UNKNOWN = 'UNKNOWN',
}

export type Type = keyof typeof TypesList

export enum StatusesList {
    FINISHED = 'FINISHED',
    ONGOING = 'ONGOING',
    UPCOMING = 'UPCOMING',
    UNKNOWN = 'UNKNOWN',
}

export type Status = keyof typeof StatusesList

export enum SeasonsList {
    SPRING = 'SPRING',
    SUMMER = 'SUMMER',
    FALL = 'FALL',
    WINTER = 'WINTER',
    UNDEFINED = 'UNDEFINED',
}

export type Season = keyof typeof SeasonsList

export interface AnimeSeason {
    season: Season,
    year: number,
}

export interface Anime {
    sources: Array<string>,
    title: string,
    type: Type,
    episodes: number,
    status: Status,
    animeSeason: AnimeSeason,
    picture: string,
    thumbnail: string,
    synonyms: Array<string>,
    relations: Array<string>,
    tags: Array<string>,
}

interface License {
    name: string,
    url: string,
}

export interface Database {
    license: License,
    repository: string,
    lastUpdate: string,
    data: Array<Anime>,
}