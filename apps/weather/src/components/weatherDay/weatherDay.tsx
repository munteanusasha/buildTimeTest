// import {Link} from "react-router"; // FOR EXAMPLE
import dayjs from "dayjs";
import styles from "./weatherDay.module.css";


type WeatherDayProps = {
  city: string,
  country: string,
  dt: number;
  dayTemp: number,
  icon: string,
  desc: string,
  weatherMain: string,
  maxTemp: number;
  minTemp: number;
}



export default function WeatherDay(props :WeatherDayProps) {
  //
  // const numList = [1, 2, 3, 4, 5, 6];  // EXAMPLE
  //
  return (
    <>
      <div className={styles.weather}>
        <div className={styles.dayWeather}>
          <h2>
            {props.city}, {props.country} Weather
          </h2>

          <p>
            {dayjs.unix(props.dt).format("HH:mm")}
            {/* {dayjs(data.dt).format('{YYYY} MM-DDTHH:mm:ss SSS [z] A')} */}
          </p>
          <div className={styles.temp}>
            {Math.round(props.dayTemp)}C&#176;
          </div>
          <p>{props.desc}</p>
          <h3>{props.weatherMain}</h3>
        </div>
        <div className={styles.dayCard}>
          <p id={styles.desc}>{props.desc}</p>

          <img
            id={styles.icon}
            src={`https://openweathermap.org/payload/api/media/file/${props.icon}.png`}
            alt={props.desc}
            data-name="weatherIcon"
          />

          <p>
            Max:{Math.round(props.maxTemp)}C&deg; /Min:
            {Math.round(props.minTemp)}C&#176;
          </p>
        </div>
      </div>

      {/* <ul>  // EXAMPLE
        {numList.map((item) => { // return in {} or () without {}
          return (
          <Link key={item} to={`/weatherDay/${item}`}>
            <li>Item : {item}</li>
          </Link>
          );
        })}
      </ul> */}
    </>
  );
}
