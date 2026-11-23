import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";

import axios from "axios";
import dayjs from "dayjs";
import styles from "./weatherDay.module.css";
import type { WeatherData } from "../../util/types";
import Hourly from "../hourly/hourly";

const WeatherDay = () => {
  const params = useParams<{ city: string, day: string }>();

  const [coords, setCoords] = useState<{ lat: null, lon: null } | null>(null);

  const [dayForecast, setDayForecast] = useState<WeatherData>({
    country: "Country",
    hourly: [{
      temp: 0,
      time: 0,
      maxTemp: 0,
      minTemp: 0,
      weatherMainDesc: "---",
      weatherIcon: '--',
    }],
  });

  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    if (params.city === undefined) return;
    const controller = new AbortController();

    axios.get(
      'https://api.openweathermap.org/data/2.5/weather',
      {
        params: {
          q: params.city,
          appid: apiKey,
          units: 'metric'
        },
        signal: controller.signal,
      }).then(({ data: {
        coord: { lat, lon },
      } }) => {
        setCoords({ lat: lat, lon: lon });
      }).catch((error) => {
        console.error("Fetching data error: ", error, "\nCity = undefined || NULL");
      });

    return () => controller.abort();
  }, [params?.city, apiKey]);

  useEffect(() => {
    if (coords === null) return;
    const controller = new AbortController();

    axios.get('https://api.openweathermap.org/data/2.5/forecast', {
      params: {
        lat: coords.lat,
        lon: coords.lon,
        appid: apiKey,
        units: 'metric'
      },
      signal: controller.signal,
    })
      .then(({ data: {
        city: { country },
        list: forecasts,
      } }) => {

        //  ***********  FILTER  ************ //

        const day = (forecast: any) => dayjs.unix(forecast.dt).format('dddd') === params.day;
        const forecast = forecasts.filter(day);

        //  ********* DESTRUCT  ************* //

        const hourly = forecast.map((hour: any) => {
          const { dt, dt_txt, main: { temp, temp_max, temp_min }, weather: [{ main, description, icon }] } = hour;
          return {
            time: dt,
            timeText: dt_txt,
            temp: temp,
            maxTemp: temp_max,
            minTemp: temp_min,
            weatherMainDesc: main,
            weatherDesc: description,
            weatherIcon: icon,
          }
        });

        //  ************   setState DAY FORECAST   ************ //
        setDayForecast({ country, hourly });
      })
      .catch((error) => {
        console.error("Fetching data error: ", error, "\nCoords = NULL");
      });

    return () => controller.abort();
  }, [params.day, coords, apiKey]);

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
          <h2>{params.city}, {dayForecast.country} Weather</h2>
          <p>
            {dayjs.unix(dayForecast.hourly[0].time).format("HH:mm")}, {params.day}
          </p>
          <div className={styles.temp}>
            {Math.round(dayForecast.hourly[0].temp)}C&#176;
          </div>
          <p>{dayForecast.hourly[0].weatherMainDesc}</p>
          <h3>{dayForecast.hourly[0].weatherMainDesc}</h3>
        </div>
        <div className={styles.dayCard}>
          <p id={styles.desc}>{dayForecast.hourly[0].weatherMainDesc}</p>
          <img
            id={styles.icon}
            src={`https://openweathermap.org/payload/api/media/file/${dayForecast.hourly[0].weatherIcon}.png`}
            alt={dayForecast.hourly[0].weatherMainDesc}
            data-name="weatherIcon"
          />
          <p>
            Max:{Math.round(dayForecast.hourly[0].maxTemp)}C&deg; /Min:
            {Math.round(dayForecast.hourly[0].minTemp)}C&#176;
          </p>
        </div>
      </div>

      {dayForecast.hourly.map((hour) =>
        <Hourly
          key={hour.time}
          hour={hour.time}
          temp={hour.temp}
          icon={`https://openweathermap.org/payload/api/media/file/${hour.weatherIcon}.png`}
        />
      )}
    </div>
  );
}
export default WeatherDay;
