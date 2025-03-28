import { useState } from 'react'

const Statics = ({good, neutral, bad, all, average, positive}) => {
  
  return (
    <>
    <h2>Statics</h2>
    Good: {good}
    <br />
    Neutral: {neutral}
    <br />
    Bad: {bad}
    <br />
    All: {all}
    <br />
    Average: {average}
    <br />
    Positive: {positive} %
    </>
  )
}

const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  
  const handleClick = (a) => {
    if(a.includes("good")){
      setGood(good + 1);
    } else if (a.includes("bad")){
      setBad(bad + 1);
    } else {
      setNeutral(neutral + 1);
    }
  }
  
  const noStatics = () => {
    if((good === 0) && (neutral === 0) && (bad === 0)){
      return true
    } else return false
  }

  const isStatics = noStatics();

  let all = good + bad + neutral;
  let average = all / 3;
  let positive = (good / all) * 100

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={() => handleClick("good")}>good</button>
      <button onClick={() => handleClick("neutral")}>neutral</button>
      <button onClick={() => handleClick("bad")}>bad</button>
      {isStatics === true 
      ? <p>No feedback given</p> 
      : <Statics good = {good} neutral = {neutral} bad = {bad} all = {all} average = {average} positive = {positive}/>}
      
    </div>
  )
}

export default App