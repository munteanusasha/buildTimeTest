import { Fragment, useState, useEffect, type KeyboardEvent, type ChangeEvent} from "react";
import { Link, useNavigate, useParams } from "react-router";

import axios from "axios";
import dayjs from "dayjs";

import WeatherDay from "../weatherDay/weatherDay";
import WeatherWeek from "../weatherWeek/weatherWeek";
import Hourly from "../hourly/hourly";

import styles from "./weatherBoard.module.css";

export default function WeatherBoard() {

type Coordinates = {lat: number | null; lon: number | null};
type Weather = {icon: string, description: string, main: string};

type CurrentWeather = {
  name: string;
  dt: number;
  coord: { lat: number ; lon: number};
  sys:{ country: string};
  main:{temp: number, temp_max: number; temp_min: number};
  weather: Weather[];
};

type ForecastItem = {
  dt:number;
  dt_txt:string;
  main:{temp: number; humidity: number};
  weather: Weather[];
}
type Forecast = {
  list: ForecastItem[];
};
type WeekDay = [string, ForecastItem[]];

  const [location, setLocation] = useState <Coordinates>({ lat: null, lon: null });
  
  const [day, setDay] = useState <CurrentWeather | null> (null);
  const [week, setWeek] = useState <Forecast | null>(null);
  const [weekDays, setWeekDays] = useState <WeekDay[]>([]);

  const [loading, setLoading] = useState(true);

  const [city, setCity] = useState<string>("Chisinau"); // use location
  
  const [cityInput, setCityInput] = useState <string> ("Chisinau") // input

  const navigate = useNavigate();
  const { dayForecast } = useParams();
  const selectedDay = dayForecast?.replace(/-forecast$/, "") ?? null;

  // API KEY
  const apiKey = import.meta.env.VITE_API_KEY_NEW;

  //   ADD EVENT LISTENER FOR ENTER/SPACE KEYS TO GET THE INPUT
  const handleCityChange = (e: ChangeEvent<HTMLInputElement>) => {
          setCityInput(e.currentTarget.value);
        }
  const handleKeyUp = (e : KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      setCity((prevCity) => prevCity = cityInput);
    }
  };

  // useEffect(() => { // GET USER COORDINATES FROM USER LOCATION

  //   navigator.geolocation.getCurrentPosition((position) => {
  //     setLocation({
  //       lat:position.coords.latitude,
  //       lon:position.coords.longitude,
  //     })
  //   },
  //     (error) => console.error("Could not get location!", error.message));
  // },[])

  useEffect(() => { // GET LAT/LON OF THE CITY
  
    axios
      .get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
          q: city,
          appid: apiKey,
          units: "metric",
        },
      })
      .then((response) => {
        setDay(response.data);
        // console.log("Response by city: ", response);
        setLocation({
          lat: response.data.coord.lat,
          lon: response.data.coord.lon,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetching data error: ", error);
        setLoading(false);
      });
  }, [city]);


  useEffect(() => { // GET TEMP OF THE CITY BY LAT/LON COORDINATES
    
    if (location.lat === null || location.lon === null) return;

    axios
      .get("https://api.openweathermap.org/data/2.5/forecast", {
        params: {
          lat: location.lat,
          lon: location.lon,
          appid: apiKey,
          units: "metric",
        },
      })
      .then((response) => {
        setWeek(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetching data error: ", error);
      });

  }, [location]);

  useEffect(() => { // WEEK DAYS
    
    if (day === null || week === null) return;

    const forecastWeekDays = week.list.reduce<Map<string, ForecastItem[]>>((groups, item) => {
      const dayName = dayjs.unix(item.dt).format("dddd");
      const forecasts = groups.get(dayName) ?? [];
      forecasts.push(item);
      groups.set(dayName, forecasts);
      return groups;
    },
  new Map(),
  )

for (const [dayName, forecasts] of forecastWeekDays) {
  setWeekDays((previous) => [...previous, [dayName, forecasts]]);
}
    return () => {
      setWeekDays([]);
    };
  }, [day, week, location]);

  //=========================================================================

  const selectedForecast = weekDays.find(
    ([dayName]) => dayName === selectedDay,
  )?.[1];

  //=========================================================================
  if (loading || day === null) return <p>Loading... </p>;

  return (
    <div className={styles.weatherBoard}>
      <input
        type="text"
        id="city"
        value={cityInput}
        onChange={handleCityChange}
        onKeyUp={handleKeyUp}
        placeholder="City:"
      />

      {/* =================   DAY =================== */}

      <WeatherDay
        city={day.name}
        country={day.sys.country}
        dt={day.dt}
        dayTemp={day.main.temp}
        icon={day.weather[0].icon}
        desc={day.weather[0].description}
        weatherMain={day.weather[0].main}
        maxTemp={day.main.temp_max}
        minTemp={day.main.temp_min}
      />

      {/* =================   WEEK  =================== */}
      <div className={styles.weekdays}>
        {!selectedDay &&
          weekDays.map(([dayName, forecasts]) => {
            const firstForecast = forecasts[0];
            return (
              <Fragment key={dayName}>
                <WeatherWeek
                  day={firstForecast.dt}
                  dtemp={firstForecast.main.temp}
                  iconUrl={`https://openweathermap.org/payload/api/media/file/${firstForecast.weather[0].icon}.png`}
                  humidity={firstForecast.main.humidity}
                  onSelect={() => navigate(`/${dayName}-forecast`)}
                  expanded={selectedDay === dayName}
                />
              </Fragment>
            );
          })}

        {/* ===================	Link back	===================== */}

        {selectedDay && (
          <Link to="/show-5-day-forecast" className={styles.backLink}>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5" />
              <path d="m12 19-7-7 7-7" />
            </svg>
            <span>5-day forecast</span>
          </Link>
        )}

        {/* =======================	Hourly	==================== */}

        {selectedForecast && (
          <div>
            {selectedForecast.map((forecast) => (
              <Hourly
                key={forecast.dt_txt}
                hour={forecast.dt}
                temp={forecast.main.temp}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
