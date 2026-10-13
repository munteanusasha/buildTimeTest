import { 
  useState, 
  // useEffect, 
  // useRef 
} from 'react'

import './App.css'
import './style/display.css';
import './style/button.css';
// import Display from './display.jsx';
// import Buttons from './buttons.jsx';

function App() {
  
  // let [display, setDisplay] = useState([0]);

  let [result, setResult] = useState(0);
  
  // use effect && use ref
  // const prevResultRef = useRef(0);
  // useEffect(() => {prevResultRef.current = result;}, [result]);
  // const prevResult = prevResultRef.current;


  const symbols = ['%', '/', '*', '+', '-']; // -- "+-"  = 2 char

  function handleButton(e){
    // const buttonValue = e.currentTarget.value;
    const buttonValue = e.target.value; // ?
    
    // const prevResult = setResult((prev) => {console.log(prev);}); // tried to get the prev state outside the function. BULLSHIT
    

    // if 1st time press a button
    if(result === 0 ){                  
      // set result = with 1st button pressed
      setResult(result = buttonValue); 
    }
    // check symbols if repeats
    
    else if(symbols.includes(buttonValue, result[result.length - 1])){
      // if()
      console.log("Includes");

      setResult(result = result.slice(0, result.length - 1) + buttonValue);      
    } 
    else{
      setResult(result += buttonValue);
    }

    // console.log("last prevResult char: ", prevResult[prevResult.length-1]);
    // console.log(prevResult, typeof prevResult);
    console.log(`pressed: ${buttonValue}`);
    // console.log("Display: ",typeof display);
    console.log("Result: ", result, "with length of:", result.length);
    console.log("Result: ",typeof result);
  }

  // function add(){
    
  // }
  // function sub(){

  // }
  // function mul(){

  // }
  // function div(){
    
  // }

  function del(){
    if(result.length > 0){
      setResult(result = result.slice(0,result.length - 1));
    }
  }

  function clearScreen(e){
    console.log("Clear screen");
    return setResult(result = 0);
  }

  function calc(e){
    try{
      setResult(result = eval(result));
    }
    catch(error){
      console.error("Invalid operation...");
      setResult(result = 0);
    };
  }
  // function display(){
  //   useEffect(() => {
  //     document.getElementById = result; // ?!
  //   }, result);
  // } 

  // function updateScreen(){

  // }

  return (
    <>
      
      {/* <Display />
      <Buttons /> */}

      <div id="display">{result}</div>

      <div id="buttons">
        <button value="AC" onClick={clearScreen}>AC</button>
        <button value="+-" onClick={handleButton}>±</button>
        <button value="%" onClick={handleButton}>%</button>
        <button className="bgColorYellow" onClick={del}>⤺</button>
        

        <button value="7" onClick={handleButton}>7</button>
        <button value="8" onClick={handleButton}>8</button>
        <button value="9" onClick={handleButton}>9</button>
        <button className="bgColorYellow" value="/" onClick={handleButton}>÷</button>
        

        <button value="4" onClick={handleButton}>4</button>
        <button value="5" onClick={handleButton}>5</button>
        <button value="6" onClick={handleButton}>6</button>
        <button className="bgColorYellow" value="*" onClick={handleButton}>x</button>
        

        <button value="1" onClick={handleButton}>1</button>
        <button value="2" onClick={handleButton}>2</button>
        <button value="3" onClick={handleButton}>3</button>
        <button className="bgColorYellow" value="-" onClick={handleButton}>-</button>
        
        
        <button value="0" onClick={handleButton}>0</button>
        <button value="." onClick={handleButton}>.</button>
        <button className="bgColorYellow" value="+" onClick={handleButton}>+</button>
        <button className="bgColorYellow" value="=" onClick={calc}>=</button>
        
    </div>


    </>
  );
}

export default App;
