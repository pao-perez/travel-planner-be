import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { WeatherDTO } from './dtos/weather.dto';

@Injectable()
export class WeatherService {
  private weatherApiUrl: string;
  private apiKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.weatherApiUrl = this.configService.get<string>('WEATHER_API_URL');
    this.apiKey = this.configService.get<string>('WEATHER_API_KEY');
  }

  async getCurrentWeather(cityName: string): Promise<WeatherDTO> {
    const url = `${this.weatherApiUrl}/current.json?key=${this.apiKey}&q=${cityName}`;

    try {
      const response: AxiosResponse = await this.httpService.axiosRef.get(url);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch weather data: ${error.message}`);
    }
  }
}
