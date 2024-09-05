import { Test, TestingModule } from '@nestjs/testing';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { WeatherService } from '../weather/weather.service';
import { CityDTO } from './dtos/city.dto';

describe('CityController', () => {
  let cityController: CityController;
  let cityService: CityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CityController],
      providers: [
        {
          provide: CityService,
          useValue: {
            getAllCities: jest.fn(),
            getCityByName: jest.fn(),
          },
        },
        {
          provide: WeatherService,
          useValue: {
            getCurrentWeather: jest.fn(),
          },
        },
      ],
    }).compile();

    cityController = module.get<CityController>(CityController);
    cityService = module.get<CityService>(CityService);
  });

  it('should return all cities', () => {
    const mockCities: CityDTO[] = [
      {
        name: 'france-paris',
        label: 'Paris',
        description: 'Paris description',
      },
      { name: 'italy-rome', label: 'Rome', description: 'Rome description' },
    ];

    jest.spyOn(cityService, 'getAllCities').mockReturnValue(mockCities);

    const result = cityController.getAllCities();
    expect(result).toEqual(mockCities);
  });
});
