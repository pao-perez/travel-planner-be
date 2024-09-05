import { Test, TestingModule } from '@nestjs/testing';
import { CityService } from './city.service';
import { City } from './entities/city.entity';

describe('CityService', () => {
  let cityService: CityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CityService],
    }).compile();

    cityService = module.get<CityService>(CityService);

    cityService['cities'] = [
      {
        name: 'france-paris',
        label: 'Paris',
        description:
          'Paris is the capital city of France, known for its art, culture, and fashion.',
      },
      {
        name: 'unitedkingdom-london',
        label: 'London',
        description:
          'London is the capital of the UK, famous for its history, architecture, and the River Thames.',
      },
      {
        name: 'italy-rome',
        label: 'Rome',
        description:
          'Rome is the capital city of Italy. It is also the capital of the Lazio region, the centre of the Metropolitan City of Rome Capital.',
      },
      {
        name: 'germany-berlin',
        label: 'Berlin',
        description:
          "Berlin, Germany’s capital, dates to the 13th century. Reminders of the city's turbulent 20th-century history include its Holocaust memorial and the Berlin Wall's graffitied remains. Divided during the Cold War, its 18th-century Brandenburg Gate has become a symbol of reunification.",
      },
      {
        name: 'japan-tokyo',
        label: 'Tokyo',
        description:
          'Tokyo, Japan’s busy capital, mixes the ultramodern and the traditional, from neon-lit skyscrapers to historic temples. The opulent Meiji Shinto Shrine is known for its towering gate and surrounding woods. The Imperial Palace sits amid large public gardens.',
      },
    ];
  });

  it('should return all cities', () => {
    const cities: City[] = [
      {
        name: 'france-paris',
        label: 'Paris',
        description:
          'Paris is the capital city of France, known for its art, culture, and fashion.',
      },
      {
        name: 'unitedkingdom-london',
        label: 'London',
        description:
          'London is the capital of the UK, famous for its history, architecture, and the River Thames.',
      },
      {
        name: 'italy-rome',
        label: 'Rome',
        description:
          'Rome is the capital city of Italy. It is also the capital of the Lazio region, the centre of the Metropolitan City of Rome Capital.',
      },
      {
        name: 'germany-berlin',
        label: 'Berlin',
        description:
          "Berlin, Germany’s capital, dates to the 13th century. Reminders of the city's turbulent 20th-century history include its Holocaust memorial and the Berlin Wall's graffitied remains. Divided during the Cold War, its 18th-century Brandenburg Gate has become a symbol of reunification.",
      },
      {
        name: 'japan-tokyo',
        label: 'Tokyo',
        description:
          'Tokyo, Japan’s busy capital, mixes the ultramodern and the traditional, from neon-lit skyscrapers to historic temples. The opulent Meiji Shinto Shrine is known for its towering gate and surrounding woods. The Imperial Palace sits amid large public gardens.',
      },
    ];

    const result = cityService.getAllCities();
    expect(result).toEqual(cities);
  });

  it('should return a city by name', () => {
    const cityName = 'france-paris';
    const expectedCity: City = {
      name: 'france-paris',
      label: 'Paris',
      description:
        'Paris is the capital city of France, known for its art, culture, and fashion.',
    };

    const result = cityService.getCityByName(cityName);
    expect(result).toEqual(expectedCity);
  });

  it('should create and return a new city if it does not exist', () => {
    const newCity: City = {
      name: 'usa-newyork',
      label: 'New York',
      description:
        'New York City comprises 5 boroughs sitting where the Hudson River meets the Atlantic Ocean. At its core is Manhattan, a densely populated borough.',
    };

    const result = cityService.createCity(newCity);

    expect(result).toEqual(newCity);
    expect(cityService['cities']).toContain(newCity); // Verify that the new city is added to the array.
  });

  it('should return null when trying to create a city that already exists', () => {
    const existingCity: City = {
      name: 'france-paris',
      label: 'Paris',
      description:
        'Paris is the capital city of France, known for its art, culture, and fashion.',
    };

    const result = cityService.createCity(existingCity);

    expect(result).toBeNull();
  });

  it('should update and return the updated city if it exists', () => {
    const updatedCityData: Partial<City> = {
      label: 'Paris Updated',
      description: 'Updated description of Paris.',
    };

    const result = cityService.updateCityByName(
      'france-paris',
      updatedCityData,
    );

    expect(result).toEqual({
      name: 'france-paris',
      label: 'Paris Updated',
      description: 'Updated description of Paris.',
    });
  });

  it('should return null when trying to update a non-existent city', () => {
    const updatedCityData: Partial<City> = {
      label: 'Unknown City',
    };

    const result = cityService.updateCityByName(
      'unknown-city',
      updatedCityData,
    );

    expect(result).toBeNull();
  });

  it('should delete a city by name and return true', () => {
    const result = cityService.deleteCityByName('france-paris');

    expect(result).toBe(true);
    expect(
      cityService['cities'].find((city) => city.name === 'france-paris'),
    ).toBeUndefined(); // Verify the city is removed.
  });

  it('should return false when trying to delete a non-existent city', () => {
    const result = cityService.deleteCityByName('unknown-city');

    expect(result).toBe(false);
  });
});
