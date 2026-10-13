import Functions from "./functions";
import Buttons from "./buttons";

import "./style/display.css";
import { useState } from "react";

export default function Display(){
  const [result, setResult] = useState(0);

  // result = (resultAfterMath) => {
  //   return resultAfterMath;
  // };

  return(
    <div id="result">{result}</div>
  );
}