import React, { Fragment, StrictMode, useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';

const Moles = ({ children }) => <div>{children}</div>

const TIME_LIMIT = 30000

const Timer = ({ time, interval = 1000, onEnd }) => {
  const [internalTime, setInternalTime] = useState(time)
  const timerRef = useRef(time)
  const timeRef = useRef(time)
  useEffect(() => {
    timerRef.current = setInterval(
      () => setInternalTime((timeRef.current -= interval)),
      interval
    )
    return () => {
      clearInterval(timerRef.current)
    }
  }, [interval])
  return <div>{`Time: ${internalTime / 1000}s`}</div>
}
const MOLE_SCORE = 100

const Mole = ({ onWhack }) => (
  <button onClick={() => onWhack(MOLE_SCORE)}>Mole</button>
)

const Score = ({ value }) => <div>{`Score: ${value}`}</div>


const Game = () => {
  const [playing, setPlaying] = useState(false)
  const [score, setScore] = useState(0)
  const onWhack = points => setScore(score + points)
  return (
    <Fragment>
      {!playing && <h1>Whac-A-Mole</h1>}
      <button onClick={() => setPlaying(!playing)}>
        {playing ? 'Stop' : 'Start'}
      </button>
      {playing && (
        <Fragment>
          <Score value={score}/>
          <Timer time={TIME_LIMIT} onEnd={() => setPlaying(false)}/>
          <Moles>
            <Mole onWhack={onWhack}/>
            <Mole onWhack={onWhack}/>
            <Mole onWhack={onWhack}/>
            <Mole onWhack={onWhack}/>
            <Mole onWhack={onWhack}/>
          </Moles>
        </Fragment>
      )}
    </Fragment>
  )
}


ReactDOM.render(
  <StrictMode>
    <Game />
  </StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
