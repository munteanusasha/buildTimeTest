import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";

import weatherApi from "../../doc/axios";
import dayjs from "dayjs";

import styles from "./weatherDay.module.css";
import Hourly from "../hourly/hourly";
import type { ForecastItem, HourlyProps } from "../../util/types";

const WeatherDay = () => {
  const params = useParams<{ city: string, day: string }>();

  //===========================================================
  //                         useQuery

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["forecast", params.city, params.day],
    enabled: Boolean(params.city),
    queryFn: async ({ signal }) => {

      // REQUEST for coord by params.city
      const { data: { coord: { lat, lon } } } = await weatherApi.get("/weather", { params: { q: params.city }, signal });

      // REQUEST for forecast by coords
      const { data } = await weatherApi.get("/forecast", { params: { lat: lat, lon: lon }, signal });
      return data;
    },

    select: ({ city: { country }, list: forecasts }) => {

      //  ***********    FILTER    ************

      const day = (forecast: ForecastItem) => dayjs.unix(forecast.dt).format("dddd") === params.day;
      const forecast = forecasts.filter(day);

      //  ***********   DESTRUCT   *************

      const hourly = forecast.map((hour: ForecastItem) => {
        const { dt, dt_txt, main: { temp, temp_max, temp_min }, weather: [{ main, description, icon }] } = hour;
        return {
          hour: dt,
          timeText: dt_txt,
          temp: temp,
          maxTemp: temp_max,
          minTemp: temp_min,
          weatherMainDesc: main,
          weatherDesc: description,
          weatherIcon: icon,
        }
      });
      return { country, hourly };
    }
  });

  if (isPending) return <p>Loading...</p>
  if (isError) return <p>Could not load weather:{error?.message}</p>

  //                    end useQuery
  //===========================================================

  const hourly = data.hourly.map((hour: HourlyProps) => {
    return (
      <Hourly
        key={hour.hour}
        hour={hour.hour}
        temp={hour.temp}
        icon={`https://openweathermap.org/payload/api/media/file/${hour.weatherIcon}.png`}
      />
    )
  })

  return (
    <div>
      <div className={styles.weather}>
        <Link to="/" className={styles.backLink}>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="lightgrey"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5" />
            <path d="m12 21-9-9 9-9" />
          </svg>
          <span>5-day<br />forecast</span>
        </Link>
        <div className={styles.dayWeather}>
          <h2>{params.city}, {data?.country ?? "---"} Weather</h2>
          <p>
            {dayjs.unix(data?.hourly[0].hour ?? NaN).format("HH:mm")}, {/** TIME  */}
            {params.day}
          </p>
          <div className={styles.temp}>
            {Math.round(data?.hourly[0].temp ?? NaN)}C&#176;
          </div>
          <p>{data?.hourly[0].weatherMainDesc ?? "--"}</p>
          <h3>{data?.hourly[0].weatherMainDesc ?? "--"}</h3>
        </div>
        <div className={styles.dayCard}>
          <p id={styles.desc}>{data?.hourly[0].weatherMainDesc ?? "--"}</p>
          <img
            id={styles.icon}
            src={`https://openweathermap.org/payload/api/media/file/${data?.hourly[0].weatherIcon ?? "--"}.png`}
            alt={data?.hourly[0].weatherMainDesc ?? "--"}
            data-name="weatherIcon"
          />
          <p>
            Max:{(Math.round(data?.hourly[0].maxTemp ?? 0))}C&deg; /Min:
            {Math.round(data?.hourly[0].minTemp ?? 0)}C&#176;
          </p>
        </div>
      </div>
      {hourly}
    </div>
  );
}
export default WeatherDay;
