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

  afterAll(async () => {
    await app.close();
  });

  it('/cities (GET) - should return all cities', () => {
    return request(app.getHttpServer())
      .get('/cities')
      .expect(200)
      .expect((res) => {
        expect(res.body.length).toBe(5);
        expect(res.body[0]).toHaveProperty('name');
        expect(res.body[0]).toHaveProperty('label');
      });
  });

  it('/cities/:name (GET) - should return a city by name', () => {
    return request(app.getHttpServer())
      .get('/cities/unitedkingdom-london')
      .expect(200)
      .expect((res) => {
        expect(res.body.name).toBe('unitedkingdom-london');
        expect(res.body.label).toBe('London');
      });
  });

  it('/cities (POST) - should create a new city', () => {
    const newCity = {
      name: 'usa-newyork',
      label: 'New York',
      description: 'The city that never sleeps.',
    };

    return request(app.getHttpServer())
      .post('/cities')
      .send(newCity)
      .expect(201)
      .expect((res) => {
        expect(res.body.name).toBe(newCity.name);
        expect(res.body.label).toBe(newCity.label);
        expect(res.body.description).toBe(newCity.description);
      });
  });

  it('/cities/:name (PUT) - should update a city by name', () => {
    const updatedCityData = {
      label: 'Tokyo Updated',
      description: 'An updated description of Tokyo.',
    };

    return request(app.getHttpServer())
      .put('/cities/japan-tokyo')
      .send(updatedCityData)
      .expect(200)
      .expect((res) => {
        expect(res.body.name).toBe('japan-tokyo');
        expect(res.body.label).toBe(updatedCityData.label);
        expect(res.body.description).toBe(updatedCityData.description);
      });
  });

  it('/cities/:name (DELETE) - should delete a city by name', () => {
    return request(app.getHttpServer())
      .delete('/cities/japan-tokyo')
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual({ success: true });
      });
  });

  it('/cities/:name (GET) - should return 404 for a deleted city', () => {
    return request(app.getHttpServer())
      .get('/cities/usa-newyork')
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toBe('City with name usa-newyork not found');
      });
  });

  it('/weather/:name (GET) - should return weather for a city', () => {
    return request(app.getHttpServer())
      .get('/weather/unitedkingdom-london')
      .expect(200)
      .expect((res) => {
        expect(res.body.location.name).toBe('London');
      });
  });
});
