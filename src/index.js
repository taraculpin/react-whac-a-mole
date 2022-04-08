import React, { Fragment, StrictMode, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';

const Moles = ({ children }) => <div>{children}</div>
const Mole = () => <button>Mole</button>
const Timer = () => <div>Time: 00:00</div>
const Score = () => <div>Score: 0</div>

const Game = () => {
  const [playing, setPlaying] = useState(false)
  return (
    <Fragment>
      {!playing && <h1>Whac-A-Mole</h1>}
      <button onClick={() => setPlaying(!playing)}>
        {playing ? 'Stop' : 'Start'}
      </button>
      {playing && (
        <Fragment>
          <Score />
          <Timer />
          <Moles>
            <Mole />
            <Mole />
            <Mole />
            <Mole />
            <Mole />
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
