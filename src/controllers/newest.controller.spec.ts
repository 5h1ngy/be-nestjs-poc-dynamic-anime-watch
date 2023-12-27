import { Test, TestingModule } from '@nestjs/testing';
import { NewestController } from './newest.controller';
import { AnimeService } from '../services/anime.service';

describe('AppController', () => {
  let appController: NewestController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [NewestController],
      providers: [AnimeService],
    }).compile();

    appController = app.get<NewestController>(NewestController);
  });

  describe('root', () => {
    it("['FINISHED', 'ONGOING', 'UPCOMING', 'UNKNOWN']", () => {
      expect(appController.getStatuses())
        .toBe(['FINISHED', 'ONGOING', 'UPCOMING', 'UNKNOWN']);
    });
  });
});
