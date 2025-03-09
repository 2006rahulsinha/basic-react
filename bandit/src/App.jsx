import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SentimentAnalyzer from './SentimentAnalyzer'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SentimentAnalyzer></SentimentAnalyzer>

    </>
  )
}

export default App
