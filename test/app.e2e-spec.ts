import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/cities (GET)', () => {
    return request(app.getHttpServer())
      .get('/cities')
      .expect(200)
      .expect((res) => {
        expect(res.body.length).toBe(5);
      });
  });

  it('/cities/:name (GET)', () => {
    return request(app.getHttpServer())
      .get('/cities/europe-london')
      .expect(200)
      .expect((res) => {
        expect(res.body.name).toBe('europe-london');
      });
  });
});
