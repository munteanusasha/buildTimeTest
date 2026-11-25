import styles from "./hourly.module.css";
import dayjs from "dayjs";

import { type HourlyProps } from "../../util/types" // IMPORT TYPES DECLARATION

const Hourly = (props: HourlyProps) => {

  return (
    <div id="hourly" className={styles.expand}>
      <p> ⏲ {dayjs.unix(props.hour).format("HH:mm")}</p>
      &nbsp;
      <p>{Math.round(props.temp)} &#176;C</p>
      <img className={styles.icon} src={props.icon} alt="meteo-condition-icon" />
    </div>
  );
}
export default Hourly;
