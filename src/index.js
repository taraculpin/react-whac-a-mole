import React, { Fragment, StrictMode, useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import gsap from 'gsap';

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
const TIME_LIMIT = 30000
const MOLE_SCORE = 100
const NUMBER_OF_MOLES = 5
const POINTS_MULTIPLIER = 0.9
const TIME_MULTIPLIER = 1.25

const Mole = ({ onWhack, points, delay, speed, pointsMin = 10 }) => {
  const [whacked, setWhacked] = useState(false)
  const bobRef = useRef(null)
  const pointsRef = useRef(points)
  const buttonRef = useRef(null)
  useEffect(() => {
    gsap.set(buttonRef.current, {
      yPercent: 100,
      display: 'block'
    })
    bobRef.current = gsap.to(buttonRef.current, {
      yPercent: 0,
      duration: speed,
      yoyo: true,
      repeat: -1,
      delay: delay,
      repeatDelay: delay,
      onRepeat: () => {
        pointsRef.current = Math.floor(
          Math.max(pointsRef.current * POINTS_MULTIPLIER, pointsMin)
        )
      },
    })
    return () => {
      if (bobRef.current) bobRef.current.kill()
    }
  }, [pointsMin, delay, speed])


  useEffect(() => {
    if (whacked) {
      pointsRef.current = points
      bobRef.current.pause()
      gsap.to(buttonRef.current, {
        yPercent: 100,
        duration: 0.1,
        onComplete: () => {
          gsap.delayedCall(gsap.utils.random(1, 3), () => {
            setWhacked(false)
            bobRef.current
             .restart()
             .timeScale(bobRef.current.timeScale() * TIME_MULTIPLIER)
          })
        },
      })
    }
  }, [whacked])

  const whack = () => {
    setWhacked(true)
    onWhack(pointsRef.current)
  }
  return (
    <div className="mole-hole">
      <button
        className="mole-button"
        ref={buttonRef}
        onClick={whack}
      >
      </button>
    </div>
  )
}
const Moles = ({ children }) => <div className="moles">{children}</div>
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
        <button className="control-button" onClick={startGame}>
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
              <Mole key={id} onWhack={onWhack} points={MOLE_SCORE} delay={0} speed={1.5}/>
            )}
          </Moles>
        </Fragment>
      }
      {finished &&
        <Fragment>
          <Score value={score} />
          <button onClick={startGame} className="control-button">Play Again</button>
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
