import styles from "./hourly.module.css";
import dayjs from "dayjs";

type HourlyProps = {
  hour: number;
  temp: number;
}

export default function Hourly(props: HourlyProps) {
  function handleClick() {
    // get element style propety and change display to be visibl inline / block or inline - block
    //
    // const showHour = document.getElementById("hourly");
    // showHour.style.display = "inline-block";
  }

  return (
    <div id="hourly" className={styles.expand} onClick={handleClick}>
      <p> ⏲ {dayjs.unix(props.hour).format("HH:mm")}</p>
      &nbsp;
      <p>{Math.round(props.temp)} &#176;C</p>
    </div>
  );
}
