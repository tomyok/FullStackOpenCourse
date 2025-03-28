import { useState } from 'react'

const StaticLine = ({text, value}) => {

  return (
    <>
    <tr>
      <td>
        {text}: 
      </td>
      <td>
        {value}
      </td>
    </tr>
    </>

  )
}

const Statics = ({good, neutral, bad, all, average, positive}) => {
  
  return (
    <>
    <h2>Statics</h2>
    <table>
      <tbody>
        <StaticLine text = "Good" value = {good}/>
        <StaticLine text = "Neutral" value = {neutral}/>
        <StaticLine text = "Bad" value = {bad}/>
        <StaticLine text = "All" value = {all}/>
        <StaticLine text = "Average" value = {average}/>
        <StaticLine text = "Positive %" value = {positive}/>
      </tbody>
    </table>
    </>
  )
}

const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [selected, setSelected] = useState(0)
  
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  const randomAnecdote = () => {
    setSelected(getRandomInt(0, anecdotes.length))
  }
  
  
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
      <br />
      <button onClick={randomAnecdote}>Next Anecdote</button>
      <p>{anecdotes[selected]}</p>
    </div>
  )
}

export default App