// import WeeksDayExpand from "../weeksdayexpand/weeksdayexpand";

import styles from "./weatherWeek.module.css";
import dayjs from "dayjs";

import { type WeatherWeekProps } from "../../util/types"  // IMPORT TYPES DECLARATION


export default function WeatherWeek(props: WeatherWeekProps) {
  return (
    <div
      className={styles.weekDayForecast}
      onClick={props.onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          props.onSelect();
        }
      }}
      aria-expanded={props.expanded}
    >
      <div className={styles.weekday}>
        <p className={styles.day}>
          {dayjs.unix(props.day).format("ddd HH:mm")}
        </p>
        <p className={styles.tempDay}>{Math.round(props.dtemp)}&#176;C</p>
        <img src={props.iconUrl} alt="weather-icon" />
        <p className={styles.humidity}>Humid: {props.humidity}%</p>

      </div>
    </div>
  );
}
