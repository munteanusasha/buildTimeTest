

//  ##  WeatherDay
  export type WeatherDayProps = {
  city: string,
  country: string,
  dt: number;
  dt_txt: string;
  dayTemp: number,
  icon: string,
  desc: string,
  weatherMain: string,
  maxTemp: number;
  minTemp: number;
}

export interface CurrentWeatherData {
  city: string,
  country: string,
  dayTime: number,
  dayTime_txt: string,
  currentTemp: number,
  maxTemp: number,
  minTemp: number,
  weatherIcon: string,
  weatherMainDesc: string,
  weatherDesc: string,
}

export interface WeatherData{
  country: string,
  hourly: forecast[],
}

export interface forecast {
  time: number,
  temp: number,
  maxTemp:number,
  minTemp:number,
  weatherMainDesc: string,
  weatherIcon: string,
}

//  ## Weather Week Days

export type WeatherWeekProps = {
  onSelect: () => void;
  expanded: boolean;
  day: number;
  dtemp: number;
  iconUrl: string;
  humidity: number;
}

//  ## Hourly
export type HourlyProps = {
  hour: number;
  temp: number;
  icon: string;
}

  //  ### Weather Board
  
  export type Coordinates = { lat: number | null; lon: number | null };
  export type Weather = { icon: string, description: string, main: string };

  export type CurrentWeather = {
    name: string;
    dt: number;
    dt_txt: string;
    coord: { lat: number; lon: number };
    sys: { country: string };
    main: { temp: number, temp_max: number; temp_min: number };
    weather: Weather[];
  };

  export type ForecastItem = {
    dt: number;
    dt_txt: string;
    main: { temp: number; temp_max: number; temp_min: number , humidity: number};
    weather: Weather[];
  }

  export type Forecast = {
    list: ForecastItem[];
  };

  export type WeekDay = [string, ForecastItem[]];
 
