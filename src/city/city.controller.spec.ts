import { Test, TestingModule } from '@nestjs/testing';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { WeatherService } from '../weather/weather.service';
import { CityDTO } from './dtos/city.dto';
import { WeatherDTO } from '../weather/dtos/weather.dto';

describe('CityController', () => {
  let cityController: CityController;
  let cityService: CityService;
  let weatherService: WeatherService;

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
    weatherService = module.get<WeatherService>(WeatherService);
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

  it('should return city by name with weather details', async () => {
    const mockCity = {
      name: 'europe-london',
      label: 'London',
      description: 'London description',
    };

    const mockWeather: WeatherDTO = {
      location: {
        name: 'London',
        region: 'City of London, Greater London',
        country: 'United Kingdom',
        lat: 51.52,
        lon: -0.11,
        tz_id: 'Europe/London',
        localtime_epoch: 1725519870,
        localtime: '2024-09-05 08:04',
      },
      current: {
        last_updated_epoch: 1725519600,
        last_updated: '2024-09-05 08:00',
        temp_c: 14.1,
        temp_f: 57.4,
        is_day: 1,
        condition: {
          text: 'Moderate rain',
          icon: '//cdn.weatherapi.com/weather/64x64/day/302.png',
          code: 1189,
        },
      },
    };

    jest.spyOn(cityService, 'getCityByName').mockReturnValue(mockCity);
    jest
      .spyOn(weatherService, 'getCurrentWeather')
      .mockResolvedValue(mockWeather);

    const result = await cityController.getCityByName('europe-london');
    expect(result).toEqual({
      name: 'europe-london',
      label: 'London',
      description: 'London description',
      ...mockWeather,
    });

    expect(cityService.getCityByName).toHaveBeenCalled();
    expect(cityService.getCityByName).toHaveBeenCalledWith('europe-london');

    expect(weatherService.getCurrentWeather).toHaveBeenCalled();
    expect(weatherService.getCurrentWeather).toHaveBeenCalledWith(
      'europe-london',
    );
  });
});
