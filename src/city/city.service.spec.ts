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
});
