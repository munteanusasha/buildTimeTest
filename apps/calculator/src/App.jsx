import { useState } from 'react';

import './App.css';
import './style/display.css';
import './style/button.css';

function App() {
  let [result, setResult] = useState(0);
  const symbols = ['%', '/', '*', '+', '-']; // -- "+-"  = 2 char

  const len = result.length;

  function handleButton(e) {
    const buttonValue = e.target.value; // ?
    const lastChar = String(result).slice(-1);

    // if 1st time press a button
    if (result === 0) {
      // set result = with 1st button pressed
      setResult((result = buttonValue));
    }

    // check symbols if repeats last char
    else if (symbols.includes(buttonValue) && symbols.includes(lastChar)) {
      console.log('Includes');
      del();
      setResult((result += buttonValue));
    } else {
      setResult((result += buttonValue));
    }
  }

  function del() {
    if (len > 0) {
      setResult((result = result.slice(0, len - 1)));
    }
  }

  function clearScreen() {
    console.log('Clear screen');
    return setResult((result = 0));
  }

  function calc() {
    try {
      setResult((result = eval(result)));
    } catch (error) {
      console.error('Invalid operation...', error);
      setResult((result = 0));
    }
  }

  return (
    <>
      <div id="display">{result}</div>

      <div id="buttons">
        <button value="AC" onClick={clearScreen}>
          AC
        </button>
        <button value="+-" onClick={handleButton}>
          ±
        </button>
        <button value="%" onClick={handleButton}>
          %
        </button>
        <button className="bgColorYellow" onClick={del}>
          ⤺
        </button>

        <button value="7" onClick={handleButton}>
          7
        </button>
        <button value="8" onClick={handleButton}>
          8
        </button>
        <button value="9" onClick={handleButton}>
          9
        </button>
        <button className="bgColorYellow" value="/" onClick={handleButton}>
          ÷
        </button>

        <button value="4" onClick={handleButton}>
          4
        </button>
        <button value="5" onClick={handleButton}>
          5
        </button>
        <button value="6" onClick={handleButton}>
          6
        </button>
        <button className="bgColorYellow" value="*" onClick={handleButton}>
          x
        </button>

        <button value="1" onClick={handleButton}>
          1
        </button>
        <button value="2" onClick={handleButton}>
          2
        </button>
        <button value="3" onClick={handleButton}>
          3
        </button>
        <button className="bgColorYellow" value="-" onClick={handleButton}>
          -
        </button>

        <button value="0" onClick={handleButton}>
          0
        </button>
        <button value="." onClick={handleButton}>
          .
        </button>
        <button className="bgColorYellow" value="+" onClick={handleButton}>
          +
        </button>
        <button className="bgColorYellow" value="=" onClick={calc}>
          =
        </button>
      </div>
    </>
  );
}
export default App;
