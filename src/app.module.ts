// Import necessary modules from Nest.js
import { Module } from '@nestjs/common';
import { NewestController } from './controllers/newest.controller';
import { AnimeService } from './services/anime.service';

// Define a Nest module named AppModule
@Module({
  // Specify any imported modules (none in this case)
  imports: [],

  // Specify controllers that belong to this module
  controllers: [NewestController],

  // Specify providers (services) that belong to this module
  providers: [AnimeService],
})
export class AppModule { }
