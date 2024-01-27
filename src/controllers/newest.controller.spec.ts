import { Test, TestingModule } from '@nestjs/testing';
import { NewestController } from './newest.controller';
import { AnimeService } from '../services/anime.service';
import { AnimeStatus, AnimeType } from 'types/anime';

describe('NewestController', () => {
  let newestController: NewestController;
  let animeService: AnimeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewestController],
      providers: [AnimeService],
    }).compile();

    newestController = module.get<NewestController>(NewestController);
    animeService = module.get<AnimeService>(AnimeService);
  });

  describe('getStatuses', () => {
    it('should return available anime statuses', () => {
      const expectedStatuses: AnimeStatus[] = ['FINISHED', 'ONGOING', 'UPCOMING', 'UNKNOWN'];
      expect(newestController.getStatuses()).toEqual(expectedStatuses);
    });
  });

  describe('getTypes', () => {
    it('should return available anime types', () => {
      const expectedTypes: AnimeType[] = ['TV', 'MOVIE', 'OVA', 'ONA', 'SPECIAL', 'UNKNOWN'];
      expect(newestController.getTypes()).toEqual(expectedTypes);
    });
  });

  describe('getNewest', () => {
    it('should return paginated subset of newest anime and total count', () => {
      // Mock data for testing
      const mockAnimeData = [
        // ... mocked anime data here ...
      ];

      // Mock the getAnime method in the animeService to return the mock data
      jest.spyOn(animeService, 'getAnime').mockReturnValue(mockAnimeData);

      // Mock the AnimeService.getCurrentYear and getCurrentSeason methods
      jest.spyOn(AnimeService, 'getCurrentYear').mockReturnValue(2024);
      jest.spyOn(AnimeService, 'getCurrentSeason').mockReturnValue('SPRING');

      // Mock the filterTypesStatus method to always return true for testing purposes
      jest.spyOn(AnimeService, 'filterTypesStatus').mockReturnValue(true);

      // Mock the query parameters
      const mockQuery = {
        offset: 1,
        size: 10,
        types: ['TV'],
        statuses: ['ONGOING'],
      };

      const response = newestController.getNewest(mockQuery);

      // Ensure the response has the expected structure
      expect(response).toHaveProperty('data');
      expect(response).toHaveProperty('total');

      // Ensure the total count matches the mocked data length
      expect(response.total).toEqual(mockAnimeData.length);

      // Ensure the data is a paginated subset based on the query parameters
      const expectedData = mockAnimeData.slice((mockQuery.offset - 1) * mockQuery.size, ((mockQuery.offset - 1) * mockQuery.size) + mockQuery.size);
      expect(response.data).toEqual(expectedData);
    });
  });
});
