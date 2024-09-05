import { Controller, Get, Param } from '@nestjs/common';
import { CityService } from './city.service';

@Controller('cities')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  getAllCities() {
    return this.cityService.findAll();
  }

  @Get(':name')
  getCityByName(@Param('name') name: string) {
    return this.cityService.findByName(name);
  }
}
