import Functions from "./functions.jsx";
import Display from "./display.jsx";
import "./style/button.css";

export default function Buttons(value, onClick){
  
  const handleButton = Functions.handleButton();
  const clearScreen = Functions.clearScreen();

  return (
    
    <div id="buttons">
      <button value="AC" onClick={clearScreen}>AC</button>
      <button value="+/-" onClick={handleButton}>±</button>
      <button value="%" onClick={handleButton}>%</button>
      <button className="bgColorYellow" value="/" onClick={handleButton}>÷</button>

      <button value="7" onClick={handleButton}>7</button>
      <button value="8" onClick={handleButton}>8</button>
      <button value="9" onClick={handleButton}>9</button>
      <button className="bgColorYellow" value="*" onClick={handleButton}>x</button>

      <button value="4" onClick={handleButton}>4</button>
      <button value="5" onClick={handleButton}>5</button>
      <button value="6" onClick={handleButton}>6</button>
      <button className="bgColorYellow" value="-" onClick={handleButton}>-</button>

      <button value="1" onClick={handleButton}>1</button>
      <button value="2" onClick={handleButton}>2</button>
      <button value="3" onClick={handleButton}>3</button>
      <button className="bgColorYellow" value="+" onClick={handleButton}>+</button>
      
      <button className="grid-span2" value="0" onClick={handleButton}>0</button>
      <button value="." onClick={handleButton}>.</button>
      <button className="bgColorYellow" value="=" onClick={calc}>=</button>
    </div>

  );
}