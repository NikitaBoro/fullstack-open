import {useState } from 'react'

const Title = ({title}) => <div><h1>{title}</h1></div>

const Button = ({handleClick,text}) => <button onClick={handleClick}>{text}</button>

const Statistics = ({good,neutral,bad}) => {
  if(good+bad+neutral===0){
    return(
      <p>No feedback given</p>
    )
  }

  const all=good+neutral+bad
  const average=(good-bad)/all
  const positive=(good*100)/all

  return(
    <div>
      <Title title="statistics" />
      <table>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={average.toFixed(1)} />
        <StatisticLine text="positive" value={positive.toFixed(1) + " %"} />
      </table>
    </div>
  )
}

const StatisticLine =({text,value})=>{
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
    
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good+1)
  const handleNeutralClick = () => setNeutral(neutral+1)
  const handleBadClick = () => setBad(bad+1)

  return (
    <div>
      <Title title="give feedback" />
      <Button handleClick={handleGoodClick} text="Good" />
      <Button handleClick={handleNeutralClick} text="Neutral" />
      <Button handleClick={handleBadClick} text="Bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    
    </div>
  )
}

export default App