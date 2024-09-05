import { Controller, Get, Param } from '@nestjs/common';
import { CityService } from './city.service';
import { CityDTO } from './dtos/city.dto';
import { WeatherService } from 'src/weather/weather.service';
import { WeatherDTO } from 'src/weather/dtos/weather.dto';

@Controller('cities')
export class CityController {
  constructor(
    private readonly cityService: CityService,
    private readonly weatherService: WeatherService,
  ) {}

  @Get()
  getAllCities(): CityDTO[] {
    const cities = this.cityService.getAllCities();

    return cities.map((city) => ({
      name: city.name,
      label: city.label,
      description: city.description,
    }));
  }

  @Get(':name')
  async getCityByName(
    @Param('name') name: string,
  ): Promise<CityDTO & WeatherDTO> {
    const {
      name: cityName,
      label,
      description,
    } = this.cityService.getCityByName(name);
    const weather = await this.weatherService.getCurrentWeather(name);

    return {
      name: cityName,
      label,
      description,
      ...weather,
    };
  }
}
