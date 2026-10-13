import { useState } from "react";

export default function Functions(){
const [result, setResult] = useState(0);

  function handleButton(e){
    const buttonValue = e.currentTarget.value;
    // const buttonValue = e.target.value;
    Display.setResult(result += buttonValue);
    console.log(`pressed: ${buttonValue}`);
  }

  function clearScreen(e){
    return Display.setResult(result = 0);
  }

  function calc(e){
    
  }
  return(
    <></>
  );

}