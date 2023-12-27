import { Module } from '@nestjs/common';
import { NewestController } from './controllers/newest.controller';
import { AnimeService } from './services/anime.service';

@Module({
  imports: [],
  controllers: [NewestController],
  providers: [AnimeService],
})
export class AppModule { }
