import React, { useState } from 'react'
import './App.css'
import {useMusicState, useMyState} from "./state";


function App() {
  const [ count, setCount ] = useMyState()
  const [ music, setMusic ] = useMusicState()

  return (
    <div className="App">
      <h1>{count}</h1>
      <button onClick={()=>setCount(count)}>按钮1</button>
    </div>
  )
}

export default App
