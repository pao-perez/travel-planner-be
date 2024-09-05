import { Test, TestingModule } from '@nestjs/testing';
import { CityService } from './city.service';

describe('CityService', () => {
  let service: CityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CityService],
    }).compile();

    service = module.get<CityService>(CityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all cities', () => {
    const cities = service.getAllCities();
    expect(cities.length).toBe(5);
  });

  it('should return a city by name', () => {
    const city = service.getCityByName('europe-london');
    expect(city.name).toBe('europe-london');
  });
});
