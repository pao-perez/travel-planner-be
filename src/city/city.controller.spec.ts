import { Test, TestingModule } from '@nestjs/testing';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { CityDTO } from './dtos/city.dto';
import { City } from './entities/city.entity';
import { NotFoundException } from '@nestjs/common';

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
            createCity: jest.fn(),
            updateCityByName: jest.fn(),
            deleteCityByName: jest.fn(),
          },
        },
      ],
    }).compile();

    cityController = module.get<CityController>(CityController);
    cityService = module.get<CityService>(CityService);
  });

  describe('getAllCities', () => {
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
  });

  describe('getCityByName', () => {
    it('should return city by name', async () => {
      const mockCity: CityDTO = {
        name: 'unitedkingdom-london',
        label: 'London',
        description: 'London description',
      };

      jest.spyOn(cityService, 'getCityByName').mockReturnValue(mockCity);

      const result = await cityController.getCityByName('unitedkingdom-london');
      expect(result).toEqual(mockCity);

      expect(cityService.getCityByName).toHaveBeenCalledWith(
        'unitedkingdom-london',
      );
    });

    it('should throw NotFoundException when city not found', async () => {
      jest.spyOn(cityService, 'getCityByName').mockReturnValue(undefined);

      await expect(
        cityController.getCityByName('unknown-city'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('createCity', () => {
    it('should create and return the new city', async () => {
      const mockCity: CityDTO = {
        name: 'japan-tokyo',
        label: 'Tokyo',
        description: 'Tokyo description',
      };

      jest.spyOn(cityService, 'createCity').mockReturnValue(mockCity);

      const result = await cityController.createCity(mockCity);

      expect(result).toEqual(mockCity);
      expect(cityService.createCity).toHaveBeenCalledWith(mockCity);
    });

    it('should throw an error if the city already exists', async () => {
      jest.spyOn(cityService, 'createCity').mockReturnValue(undefined);

      await expect(
        cityController.createCity({ name: 'japan-tokyo', label: 'Tokyo' }),
      ).rejects.toThrow(Error);
    });
  });

  describe('updateCityByName', () => {
    it('should update and return the updated city', async () => {
      const mockUpdatedCity: CityDTO = {
        name: 'france-paris',
        label: 'Paris Updated',
        description: 'Paris description updated',
      };

      jest
        .spyOn(cityService, 'updateCityByName')
        .mockReturnValue(mockUpdatedCity);

      const result = await cityController.updateCityByName('france-paris', {
        label: 'Paris Updated',
      });

      expect(result).toEqual(mockUpdatedCity);
      expect(cityService.updateCityByName).toHaveBeenCalledWith(
        'france-paris',
        {
          label: 'Paris Updated',
        },
      );
    });

    it('should throw NotFoundException if the city does not exist', async () => {
      jest.spyOn(cityService, 'updateCityByName').mockReturnValue(undefined);

      await expect(
        cityController.updateCityByName('unknown-city', { label: 'Unknown' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteCityByName', () => {
    it('should delete the city and return { success: true }', async () => {
      jest.spyOn(cityService, 'deleteCityByName').mockReturnValue(true);

      const result = await cityController.deleteCityByName('france-paris');

      expect(result).toEqual({ success: true });
      expect(cityService.deleteCityByName).toHaveBeenCalledWith('france-paris');
    });

    it('should throw NotFoundException if the city does not exist', async () => {
      jest.spyOn(cityService, 'deleteCityByName').mockReturnValue(false);

      await expect(
        cityController.deleteCityByName('unknown-city'),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
