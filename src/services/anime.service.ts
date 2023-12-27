import _ from 'lodash';
import moment from 'moment';
import { Injectable } from '@nestjs/common';
import { Anime, Database, Status, Type, Season, SeasonsList } from 'entities/anime'
import animeDatabase from 'data/anime.json';

@Injectable()
export class AnimeService {

  static getCurrentYear(): number {
    return moment().year();
  }

  static getCurrentSeason(): Season {
    const currentMonth = moment().month();

    switch (true) {
      case currentMonth >= 2 && currentMonth <= 4:
        return SeasonsList.SPRING;
      case currentMonth >= 5 && currentMonth <= 7:
        return SeasonsList.SUMMER;
      case currentMonth >= 8 && currentMonth <= 10:
        return SeasonsList.FALL;
      case currentMonth === 11 || (currentMonth >= 0 && currentMonth <= 1):
        return SeasonsList.WINTER;
      default:
        return SeasonsList.UNDEFINED;
    }
  }

  static filterTypesStatus(anime: Anime, types: Array<Type>, statuses: Array<Status>) {

    if (types.length !== 0 && statuses.length !== 0) {
      return _.includes(types, anime.type)
        || _.includes(statuses, anime.status)
    }

    else if (types.length !== 0) {
      return _.includes(types, anime.type)
    }

    else if (statuses.length !== 0) {
      return _.includes(statuses, anime.status)
    }

    return anime
  }

  getAnime(): Array<Anime> {
    const test: Database = <Database>animeDatabase;
    return test.data;
  }

}
