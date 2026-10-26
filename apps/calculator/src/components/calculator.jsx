import { useState } from 'react';
import Button from './button';
import Display from './display';

export default function Calculator() {
  let [result, setResult] = useState(0);
  const symbols = ['%', '/', '*', '+', '-', '±', '.'];
  const len = result.length;

  function handleButton(e) {
    const buttonValue = e.target.value;
    const lastChar = String(result).slice(-1);

    if (result === 0) {
      setResult((result = buttonValue));
    } else if (symbols.includes(buttonValue) && symbols.includes(lastChar)) {
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
      <Display id="display" value={result} />
      <div id="buttons">
        <Button value="AC" onClick={clearScreen} />
        <Button value="±" onClick={handleButton} />
        <Button value="%" onClick={handleButton} />
        <Button className="bgColorYellow" value="⤺" onClick={del} />
        <Button value="7" onClick={handleButton} />
        <Button value="8" onClick={handleButton} />
        <Button value="9" onClick={handleButton} />
        <Button className="bgColorYellow" value="/" onClick={handleButton} />
        <Button value="4" onClick={handleButton} />
        <Button value="5" onClick={handleButton} />
        <Button value="6" onClick={handleButton} />
        <Button className="bgColorYellow" value="*" onClick={handleButton} />
        <Button value="1" onClick={handleButton} />
        <Button value="2" onClick={handleButton} />
        <Button value="3" onClick={handleButton} />
        <Button className="bgColorYellow" value="-" onClick={handleButton} />
        <Button value="0" onClick={handleButton} />
        <Button value="." onClick={handleButton} />
        <Button className="bgColorYellow" value="+" onClick={handleButton} />
        <Button className="bgColorYellow" value="=" onClick={calc} />
      </div>
    </>
  );
}
