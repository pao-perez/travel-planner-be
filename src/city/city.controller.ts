import { Controller, Get, Param } from '@nestjs/common';
import { CityService } from './city.service';
import { CityDTO } from './dtos/city.dto';

@Controller('cities')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  getAllCities(): Omit<CityDTO, 'description'>[] {
    const cities = this.cityService.getAllCities();

    return cities.map((city) => ({
      name: city.name,
      label: city.label,
    }));
  }

  @Get(':name')
  async getCityByName(@Param('name') cityName: string): Promise<CityDTO> {
    const { name, label, description } =
      this.cityService.getCityByName(cityName);

    return {
      name,
      label,
      description,
    };
  }
}
