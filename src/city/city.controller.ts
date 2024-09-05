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
