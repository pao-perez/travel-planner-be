import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  NotFoundException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
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
    const city = this.cityService.getCityByName(cityName);
    if (!city) {
      throw new NotFoundException(`City with name ${cityName} not found`);
    }

    return { ...city };
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createCity(@Body() cityDto: CityDTO): Promise<CityDTO> {
    const city = this.cityService.createCity({ ...cityDto });

    if (!city) {
      throw new Error(`City with name ${cityDto.name} already exists`);
    }

    return city;
  }

  @Put(':name')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateCityByName(
    @Param('name') cityName: string,
    @Body() updateCityDto: Partial<CityDTO>,
  ): Promise<CityDTO> {
    const city = this.cityService.updateCityByName(cityName, {
      ...updateCityDto,
    });
    if (!city) {
      throw new NotFoundException(`City with name ${cityName} not found`);
    }

    return city;
  }

  @Delete(':name')
  async deleteCityByName(
    @Param('name') cityName: string,
  ): Promise<{ success: boolean }> {
    const isDeleted = this.cityService.deleteCityByName(cityName);
    if (!isDeleted) {
      throw new NotFoundException(`City with name ${cityName} not found`);
    }

    return { success: isDeleted };
  }
}
