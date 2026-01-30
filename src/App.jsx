import { useState } from 'react'
import './App.css'

import { TimerModeButtons } from './components/TimerModeButtons';
import { Time } from './components/Time';
import { TimerControlButtons } from './components/TimerControlButtons';

function App() {

  return (
    <>
      <TimerModeButtons />
      <Time />
      <TimerControlButtons />
    </>
  )
}

export default App
