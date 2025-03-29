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

const Buttons = ({text, param}) => {

  return (
    <button onClick={param}>{text}</button>
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
  const [selected, setSelected] = useState({
    anecdoteCount: 0,
    votes: {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0}
  })
  
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
    setSelected({
      ...selected,
      anecdoteCount: getRandomInt(0, anecdotes.length),
  });
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

  const handleClickNext = (num) => {
    setSelected({
      ...selected,
      votes: {
        ...selected.votes,
        [num]: selected.votes[num] + 1 // Incrementa el voto en la posición correcta
      }
    });
  }

  const anecdoteVoteMax = () => {
    let voteCountMax
    let anecdoteVotePosition
    const voteCount = Object.values(selected.votes)
    for(let i = 0; i < anecdotes.length; i++){
      if(i===0){
        voteCountMax = voteCount[i];
        anecdoteVotePosition = i;
      } else if (voteCount[i] > voteCountMax){
        voteCountMax = voteCount[i];
        anecdoteVotePosition = i;
      }
    }
  return [voteCountMax, anecdoteVotePosition]
  }

  let [voteCountMax, anecdoteVotePosition] = anecdoteVoteMax();
  return (
    <div>
      <h1>Give Feedback</h1>
      <Buttons param={() => handleClick("good")} text = "Good" />
      <Buttons param={() => handleClick("neutral")} text = "Neutral" />
      <Buttons param={() => handleClick("bad")} text = "Bad" />
      {isStatics === true 
      ? <p>No feedback given</p> 
      : <Statics good = {good} neutral = {neutral} bad = {bad} all = {all} average = {average} positive = {positive}/>}
      <br />

      <h2>Anecdote of the day</h2>
      <Buttons param={randomAnecdote} text = "Next Anecdote"/>
      <Buttons param={() => handleClickNext(selected.anecdoteCount)} text = "Vote"/>
      <p>Has {selected.votes[selected.anecdoteCount]} votes</p>
      <p>{anecdotes[selected.anecdoteCount]}</p>
      
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[anecdoteVotePosition]}</p>
      <p>Has {voteCountMax} votes</p>
    </div>
  )
}

export default App