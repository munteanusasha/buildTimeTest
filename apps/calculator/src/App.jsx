import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Display from './display.jsx';
import Buttons from './buttons.jsx';

function App() {
  // const [count, setCount] = useState(0)

  

  return (
    <>
      
      <Display result={resultAfterMath}/>
      <Buttons />
    </>
  )
}

export default App
