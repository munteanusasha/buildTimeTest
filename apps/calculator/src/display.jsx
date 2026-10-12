import Functions from "./functions";
import "./style/display.css";

export default function Display(){
  const result = (resultAfterMath) => {
    return resultAfterMath;
  };

  return(
    <div id="result">{result}</div>
  );
}