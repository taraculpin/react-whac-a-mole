import React, { Fragment, StrictMode, useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';

const TIME_LIMIT = 30000

const Timer = ({ time, interval = 1000, onEnd }) => {
  const [internalTime, setInternalTime] = useState(time)
  const timerRef = useRef(time)
  const timeRef = useRef(time)
  useEffect(() => {
    if (internalTime === 0 && onEnd) {
      onEnd()
    }
  }, [internalTime, onEnd])
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
const NUMBER_OF_MOLES = 5

const Mole = ({ onWhack }) => (
  <button onClick={() => onWhack(MOLE_SCORE)}>Mole</button>
)
const Moles = ({ children }) => <div>{children}</div>
const Score = ({ value }) => <div>{`Score: ${value}`}</div>



const Game = () => {
  const [playing, setPlaying] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const onWhack = points => setScore(score + points)
  const endGame = () => {
    setPlaying(false)
    setFinished(true)
  }
  const startGame = () => {
    setScore(0)
    setPlaying(true)
    setFinished(false)
  }

  return (
    <Fragment>
      {!playing && !finished &&
      <Fragment>
        <h1>Whac-A-Mole</h1>
        <button onClick={startGame}>
          Start Game
        </button>
      </Fragment>
      }
      {playing &&
        <Fragment>
          <button
            className="end-game"
            onClick={endGame}
          >
            End Game
          </button>
          <Score value={score}/>
          <Timer time={TIME_LIMIT} onEnd={endGame}/>
          <Moles>
            {new Array(NUMBER_OF_MOLES).fill().map((_, id) =>
              <Mole key={id} onWhack={onWhack}/>
            )}
          </Moles>
        </Fragment>
      }
      {finished &&
        <Fragment>
          <Score value={score} />
          <button onClick={startGame}>Play Again</button>
        </Fragment>
      }
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
