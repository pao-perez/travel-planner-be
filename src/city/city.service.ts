import { Injectable } from '@nestjs/common';
import { City } from './city.entity';

@Injectable()
export class CityService {
  private cities: City[] = [
    {
      name: 'France/Paris',
      label: 'Paris',
      description:
        'Paris is the capital city of France, known for its art, culture, and fashion.',
    },
    {
      name: 'Europe/London',
      label: 'London',
      description:
        'London is the capital of the UK, famous for its history, architecture, and the River Thames.',
    },
    {
      name: 'Italy/Rome',
      label: 'Rome',
      description:
        'Rome is the capital city of Italy. It is also the capital of the Lazio region, the centre of the Metropolitan City of Rome Capital.',
    },
    {
      name: 'Germany/Berlin',
      label: 'Berlin',
      description:
        "Berlin, Germany’s capital, dates to the 13th century. Reminders of the city's turbulent 20th-century history include its Holocaust memorial and the Berlin Wall's graffitied remains. Divided during the Cold War, its 18th-century Brandenburg Gate has become a symbol of reunification.",
    },
    {
      name: 'Japan/Tokyo',
      label: 'Tokyo',
      description:
        'Tokyo, Japan’s busy capital, mixes the ultramodern and the traditional, from neon-lit skyscrapers to historic temples. The opulent Meiji Shinto Shrine is known for its towering gate and surrounding woods. The Imperial Palace sits amid large public gardens.',
    },
  ];

  findAll(): City[] {
    return this.cities;
  }

  findByName(name: string): City {
    return this.cities.find((city) => city.name === name);
  }
}
