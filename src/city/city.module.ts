import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { WeatherModule } from 'src/weather/weather.module';

@Module({
  imports: [WeatherModule],
  providers: [CityService],
  controllers: [CityController]
})
export class CityModule {}
