import { Controller, Get, Param } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherDTO } from './dtos/weather.dto';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get(':name')
  async getWeatherByCityName(
    @Param('name') cityName: string,
  ): Promise<WeatherDTO> {
    return await this.weatherService.getCurrentWeather(cityName);
  }
}
