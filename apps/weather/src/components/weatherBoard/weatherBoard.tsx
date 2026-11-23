import {
  useState,
  useEffect,
  type KeyboardEvent,
  type ChangeEvent,
} from "react";
import {
  useNavigate,
  useParams
} from "react-router";

import type {  // IMPORT TYPES DECLARATION
  Coordinates,
  CurrentWeather,
  Forecast,
  ForecastItem,
  WeekDay
} from "../../util/types";

import axios from "axios";
import dayjs from "dayjs";

import WeatherWeek from "../weatherWeek/weatherWeek";
import styles from "./weatherBoard.module.css";

export default function WeatherBoard() {

  const [coords, setCoords] = useState<Coordinates | null>({ lat: null, lon: null });

  const [current, setCurrent] = useState<CurrentWeather | null>(null);
  const [week, setWeek] = useState<Forecast | null>(null);
  const [weekDays, setWeekDays] = useState<WeekDay[]>([]);

  const [loading, setLoading] = useState(true);

  const [city, setCity] = useState<string>("Chisinau");

  const [cityInput, setCityInput] = useState<string>(city) // input

  const navigate = useNavigate();
  const { dayForecast } = useParams();

  const selectedDay = dayForecast?.endsWith("-forecast") ? dayForecast?.replace(/-forecast$/, "") : null;

  // API KEY
  const apiKey = import.meta.env.VITE_API_KEY;

  //   ADD EVENT LISTENER
  const handleCityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCityInput(e.target.value);
  }
  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      setCity(cityInput);
    }
  };

  useEffect(() => { // GET LAT/LON OF THE CITY
    const controller = new AbortController();

    axios
      .get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
          q: city,
          appid: apiKey,
          units: "metric",
        },
        signal: controller.signal,
      })
      .then((response) => {
        setCurrent(response.data);
        const { coord: { lat: lat, lon: lon } } = response.data;
        setCoords({ lat: lat, lon: lon });
        setLoading(false);
      })
      .catch((error) => {
        if (controller.signal.aborted) return;
        console.error("Fetching data error: ", error, "\nCity undefined | null");
        setLoading(false);
      });
    console.log("RENDER CITY");
    return () => {
      controller.abort(); // CLEAN UP AXIOS...!!!
    }
  }, [city, apiKey]);

  useEffect(() => { // GET TEMP OF THE CITY BY LAT/LON COORDINATES
    const controller = new AbortController();
    if (coords === null) return;
    axios
      .get("https://api.openweathermap.org/data/2.5/forecast", {
        params: {
          lat: coords.lat,
          lon: coords.lon,
          appid: apiKey,
          units: "metric",
        },
        signal: controller.signal,
      })
      .then((response) => {
        setWeek(response.data);
        // console.log("forecast: ", response.data);
        setLoading(false);
      })
      .catch((error) => {
        if (controller.signal.aborted) return;
        console.error("Fetching data error: ", error, "\nCoords undefined | null");
        setLoading(false);
      });
    console.log("RENDER FORECAST");
    return () => {
      controller.abort()
    }
  }, [coords, apiKey]);

  useEffect(() => { // WEEK DAYS
    if (current === null || week === null) return;

    //  *********** GROUP BY DAY  ****************//
    const forecastWeekDays = week?.list.reduce<Map<string, ForecastItem[]>>((groups, item) => {
      const dayName = dayjs.unix(item.dt).format("dddd");
      const forecasts = groups.get(dayName) ?? [];
      forecasts.push(item);
      groups.set(dayName, forecasts);
      return groups;
    },
      new Map(),
    )

    //  ************* store in weekdays grouped arrays 2 elem. ["dayName", [forecast]] *************//

    for (const [dayName, forecasts] of forecastWeekDays) {
      setWeekDays((previous) => [...previous, [dayName, forecasts]]);
    }


  }, [current, week]);

  //=========================================================================
  if (loading === null || current === null) return <p style={{ textAlign: "center" }
  }> Loading... </p >;

  return (
    <div className={styles.weatherBoard}>
      <input className={styles.city}
        type="text"
        id="city"
        value={cityInput}
        onChange={handleCityChange}
        onKeyUp={handleKeyUp}
        placeholder="City:"
      />

      {/* =================   WEEK  =================== */}
      <div className={styles.weekdays}>
        {/* //===========================================
                      showing all days forecast
              ===========================================*/}
        {weekDays.map(([dayName, forecasts]) => {
          const firstForecast = forecasts[0];

          return (
            <WeatherWeek
              key={dayName}
              day={firstForecast.dt}
              dtemp={firstForecast.main.temp}
              iconUrl={`https://openweathermap.org/payload/api/media/file/${firstForecast.weather[0].icon}.png`}
              humidity={firstForecast.main.humidity}
              onSelect={() => navigate(`/${city}/week/${dayName}`)}
              expanded={selectedDay === dayName}
            />
          );
        })}
      </div>
    </div>
  );
}
