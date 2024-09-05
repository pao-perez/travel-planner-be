import { Test, TestingModule } from '@nestjs/testing';
import { CityController } from './city.controller';
import { CityService } from './city.service';

describe('CityController', () => {
  let controller: CityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CityController],
      providers: [CityService],
    }).compile();

    controller = module.get<CityController>(CityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all cities', () => {
    const cities = controller.getAllCities();
    expect(cities.length).toBe(5);
  });

  it('should return a city by name', () => {
    const city = controller.getCityByName('Europe-London');
    expect(city.name).toBe('Europe-London');
  });
});
