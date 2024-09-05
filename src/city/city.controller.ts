import { Controller, Get, Param } from '@nestjs/common';
import { CityService } from './city.service';
import { CityDTO } from './dtos/city.dto';

@Controller('cities')
export class CityController {
  constructor(private readonly cityService: CityService) {}

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
  getCityByName(@Param('name') name: string): CityDTO {
    const city = this.cityService.getCityByName(name);

    return {
      name: city.name,
      label: city.label,
      description: city.description,
    };
  }
}
