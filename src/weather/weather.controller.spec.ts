import { Test, TestingModule } from '@nestjs/testing';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { WeatherDTO } from './dtos/weather.dto';

describe('WeatherController', () => {
  let weatherController: WeatherController;
  let weatherService: WeatherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeatherController],
      providers: [
        {
          provide: WeatherService,
          useValue: {
            getCurrentWeather: jest.fn(),
          },
        },
      ],
    }).compile();

    weatherController = module.get<WeatherController>(WeatherController);
    weatherService = module.get<WeatherService>(WeatherService);
  });

  it('should return weather by city name', async () => {
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

    jest
      .spyOn(weatherService, 'getCurrentWeather')
      .mockResolvedValue(mockWeather);

    const result =
      await weatherController.getWeatherByCityName('unitedkingdom-london');
    expect(result).toEqual(mockWeather);

    expect(weatherService.getCurrentWeather).toHaveBeenCalled();
    expect(weatherService.getCurrentWeather).toHaveBeenCalledWith(
      'unitedkingdom-london',
    );
  });
});
