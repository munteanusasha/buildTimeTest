import {
  useState,
  type KeyboardEvent,
  type ChangeEvent,
  type ReactNode,
  useMemo,
} from "react";

import {
  useNavigate,
  useParams
} from "react-router";

import { useQuery } from "@tanstack/react-query";

import weatherApi from "../../doc/axios";
import dayjs from "dayjs";

import WeatherWeek from "../weatherWeek/weatherWeek";
import styles from "./weatherBoard.module.css";

const WeatherBoard = () => {

  const [cityInput, setCityInput] = useState<string>("Chisinau") // input
  const [city, setCity] = useState<string>(cityInput);

  const navigate = useNavigate();
  const { dayForecast } = useParams();

  const selectedDay = dayForecast?.endsWith("-forecast") ? dayForecast?.replace(/-forecast$/, "") : null;

  //    ADD EVENT LISTENER
  const handleCityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCityInput(e.target.value);
  }
  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      setCity(cityInput);
    }
  };

  function groupDays(list: any) {
    return (
      list.reduce(
        //          TO DO ...
        (groups: any, item: any) => {
          const dayName = dayjs.unix(item.dt).format("dddd");

          //          TO DO ...
          // IF NOT CURRENT DAY, GET NOON TEMP AND MIDNIGHT TEMP
          // IF CURRENT DAY, CURRENT TIME, GET FIRST ENTRY
          // IF LAST DAY WITH HALF DAY ENTRIES, GET, FIRST/LAST ENTRY.

          const forecasts = groups.get(dayName) ?? [];
          const { dt, dt_txt, main: { temp, temp_max, temp_min, humidity }, weather: [{ icon, description }] } = item;
          forecasts.push({ dt, dt_txt, temp, temp_max, temp_min, humidity, icon, description });
          groups.set(dayName, forecasts);
          return groups;
        }, new Map()
      )
    );
  }

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["forecast", city],
    enabled: Boolean(city),
    queryFn: async ({ signal }) => {

      //          TO DO ...
      // IF GEOLOCATION, SKIP REQUEST BY CITY
      // IF NOT, REQUEST BY CITY
      // IF GEOLOCATION AND CITY INPUT, DO REQUEST BY CITY

      const { data: { coord: { lat, lon } } } = await weatherApi
        .get("/weather", { params: { q: city, }, signal });
      const { data } = await weatherApi.get("/forecast", { params: { lat, lon }, signal });
      return data;
    },
    select: ({ city: { country }, list }) => {
      const grouped = groupDays(list); // Map collection of weekdays + hourly forecasts
      return { city, country, grouped }; // data obj
    }
  });

  const weekForecast = useMemo(() => {
    if (!data) return;
    const cards: ReactNode[] = [];
    data.grouped.forEach((forecasts: any, dayName: string) => {
      const first = forecasts[0];

      cards.push(
        <WeatherWeek
          key={dayName}
          day={first.dt}
          dtemp={first.temp}
          iconUrl={`https://openweathermap.org/payload/api/media/file/${first.icon}.png`}
          humidity={first.humidity}
          onSelect={() => navigate(`/${city}/week/${dayName}`)}
          expanded={selectedDay === dayName}
        />
      );
    })
    return cards;
  }, [data, city, navigate, selectedDay]);

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Could not load weather:{error?.message}</p>;

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
        {weekForecast}
      </div>
    </div>
  );
}
export default WeatherBoard;