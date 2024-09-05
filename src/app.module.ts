import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CityModule } from './city/city.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env.local'],
    }),
    CityModule,
  ],
})
export class AppModule {}
