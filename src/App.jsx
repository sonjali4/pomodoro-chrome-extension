import { useState, useEffect } from 'react'
import './App.css'

import { TimerModeButtons } from './components/TimerModeButtons';
import { Time } from './components/Time';
import { TimerControlButtons } from './components/TimerControlButtons';

function App() {
  const [state, setState] = useState({
    modes: {
      pomodoro: 0,
      shortBreak: 0,
      longBreak: 0
    },
    currentMode: 'pomodoro',
    remainingTime: 0,
    timerRunning: false
  });

  const send = (action) => {
    chrome.runtime.sendMessage({ action: action });
  };

  const getState = () => {
    chrome.runtime.sendMessage({ action: 'get-state' }, (response) => {
      setState(response);
    })
  };

  useEffect(() => {
    getState();

    const listener = (message) => {
      if (message.action == 'update-time-display') {
        setState(message.state);
      }
    };

    chrome.runtime.onMessage.addListener(listener);

    return () => chrome.runtime.onMessage.removeListener(listener);
  }, []);

  return (
    <>
      <div id="main-container">
        <TimerModeButtons
          modes={state.modes}
          currentMode={state.currentMode}
        />
        <Time secondsRemaining={state.remainingTime} />
        <TimerControlButtons
          start={() => send('start')}
          pause={() => send('pause')}
          reset={() => send('reset')}
          timerRunning={state.timerRunning}
        />
      </div>
    </>
  )
}

export default App
