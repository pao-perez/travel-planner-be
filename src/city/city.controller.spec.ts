import { Test, TestingModule } from '@nestjs/testing';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { CityDTO } from './dtos/city.dto';
import { City } from './entities/city.entity';

describe('CityController', () => {
  let cityController: CityController;
  let cityService: CityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CityController],
      providers: [
        {
          provide: CityService,
          useValue: {
            getAllCities: jest.fn(),
            getCityByName: jest.fn(),
          },
        },
      ],
    }).compile();

    cityController = module.get<CityController>(CityController);
    cityService = module.get<CityService>(CityService);
  });

  it('should return all cities', () => {
    const mockCities: City[] = [
      {
        name: 'france-paris',
        label: 'Paris',
        description: 'Paris description',
      },
      { name: 'italy-rome', label: 'Rome', description: 'Rome description' },
    ];

    jest.spyOn(cityService, 'getAllCities').mockReturnValue(mockCities);

    const mockCitiesDTOs: Omit<CityDTO, 'description'>[] = [
      {
        name: 'france-paris',
        label: 'Paris',
      },
      {
        name: 'italy-rome',
        label: 'Rome',
      },
    ];

    const result = cityController.getAllCities();
    expect(result).toEqual(mockCitiesDTOs);
  });

  it('should return city by name', async () => {
    const mockCity: CityDTO = {
      name: 'europe-london',
      label: 'London',
      description: 'London description',
    };

    jest.spyOn(cityService, 'getCityByName').mockReturnValue(mockCity);

    const result = await cityController.getCityByName('europe-london');
    expect(result).toEqual({
      name: 'europe-london',
      label: 'London',
      description: 'London description',
    });

    expect(cityService.getCityByName).toHaveBeenCalled();
    expect(cityService.getCityByName).toHaveBeenCalledWith('europe-london');
  });
});
