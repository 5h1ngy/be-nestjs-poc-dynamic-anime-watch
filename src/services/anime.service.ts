// Import necessary modules and types from external sources
import _ from 'lodash';
import moment from 'moment';
import { Injectable } from '@nestjs/common';
import { Anime, Database, Status, Type, Season, SeasonsList } from 'types/anime';

// Import the anime database from a JSON file
import animeDatabase from 'data/anime.json';

// Injectable decorator marks this class as a provider that can be injected into other components
@Injectable()
export class AnimeService {

  // Static method to get the current year using the moment library
  static getCurrentYear(): number {
    return moment().year();
  }

  // Static method to get the current season based on the current month
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

  // Static method to filter anime based on types and statuses
  static filterTypesStatus(anime: Anime, types: Array<Type>, statuses: Array<Status>) {
    if (types.length !== 0 && statuses.length !== 0) {
      return _.includes(types, anime.type) || _.includes(statuses, anime.status);
    } else if (types.length !== 0) {
      return _.includes(types, anime.type);
    } else if (statuses.length !== 0) {
      return _.includes(statuses, anime.status);
    }

    return anime;
  }

  // Instance method to get the entire list of anime from the database
  getAnime(): Array<Anime> {
    // Cast animeDatabase to Database type
    const animeDatabaseTyped: Database = <Database>animeDatabase;
    return animeDatabaseTyped.data;
  }
}
