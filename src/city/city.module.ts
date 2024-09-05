import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { WeatherModule } from '../weather/weather.module';
import { WeatherService } from '../weather/weather.service';

@Module({
  imports: [WeatherModule],
  providers: [CityService, WeatherService],
  controllers: [CityController]
})
export class CityModule {}
