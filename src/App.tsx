import React, { useState } from 'react'
import './App.css'
import {useMusicState, useMyState} from "./state";


function App() {
  const [ count, setCount ] = useMyState()
  const [ music, setMusic ] = useMusicState()

  return (
    <div className="App">
      <h1>{count}</h1>
      <h1>{music.name}</h1>
      <h1>{music.singer}</h1>
      <button onClick={()=>setMusic({newValue:{name:'勋章',singer:'鹿晗'}})}>按钮1</button>
    </div>
  )
}

export default App
