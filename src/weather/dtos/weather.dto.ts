interface LocationDTO {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

interface WeatherConditionDTO {
  text: string;
  icon: string;
  code: number;
}

interface CurrentWeatherDTO {
  last_updated_epoch: number;
  last_updated: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: WeatherConditionDTO;
}

export interface WeatherDTO {
  location: LocationDTO;
  current: CurrentWeatherDTO;
}
