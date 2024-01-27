import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('NewestController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/newest/statuses (GET)', () => {
    return request(app.getHttpServer())
      .get('/newest/statuses')
      .expect(200)
      .expect((response) => {
        // Ensure the response body is an array
        expect(Array.isArray(response.body)).toBe(true);

        // Add additional expectations if needed based on the actual response content
        // For example, you can check if the response body matches a predefined array of statuses
      });
  });

  it('/newest/types (GET)', () => {
    return request(app.getHttpServer())
      .get('/newest/types')
      .expect(200)
      .expect((response) => {
        // Ensure the response body is an array
        expect(Array.isArray(response.body)).toBe(true);

        // Add additional expectations if needed based on the actual response content
        // For example, you can check if the response body matches a predefined array of types
      });
  });

  it('/newest (GET)', () => {
    return request(app.getHttpServer())
      .get('/newest')
      .query({
        offset: 1,
        size: 10,
        types: ['TV'],
        statuses: ['ONGOING'],
      })
      .expect(200)
      .expect((response) => {
        // Ensure the response body has the expected structure
        expect(response.body).toHaveProperty('data');
        expect(response.body).toHaveProperty('total');

        // Add additional expectations if needed based on the actual response content
        // For example, you can check if the total count matches the expected value
      });
  });

  afterEach(async () => {
    await app.close();
  });
});
