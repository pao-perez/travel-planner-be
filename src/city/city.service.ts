import { Injectable } from '@nestjs/common';
import { City } from './entities/city.entity';

@Injectable()
export class CityService {
  // TODO: replace with DB
  private cities: City[] = [
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

  getAllCities(): City[] {
    return this.cities;
  }

  getCityByName(name: string): City {
    return this.cities.find((city) => city.name === name);
  }

  createCity(city: City): City {
    const cityExists = this.cities.some(
      (existingCity) => existingCity.name === city.name,
    );

    if (!cityExists) {
      this.cities.push(city);
      return city;
    }

    return null;
  }

  updateCityByName(name: string, updateCity: Partial<City>): City {
    const cityIndex = this.cities.findIndex((city) => city.name === name);

    if (cityIndex === -1) {
      return null;
    }

    const existingCity = this.cities[cityIndex];
    this.cities[cityIndex] = { ...existingCity, ...updateCity };

    return this.cities[cityIndex];
  }

  deleteCityByName(name: string): boolean {
    const cityIndex = this.cities.findIndex((city) => city.name === name);

    if (cityIndex === -1) {
      return false;
    }

    this.cities.splice(cityIndex, 1);
    return true;
  }
}
