import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CityModule } from './city/city.module';
import { WeatherModule } from './weather/weather.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env.local'],
    }),
    CityModule,
    WeatherModule,
  ],
})
export class AppModule {}
