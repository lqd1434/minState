import React, { useState } from 'react'
import './App.css'
import {useMusicState, useMyState} from "./state";
import {creatStore} from "./minState/myMiniState";


function App() {
  const [ count, setCount ] = useMyState()
  const [ music,SetMusic ] = useMusicState()


  return (
    <div className="App">
      <h1>{count}</h1>
      <h1>{music}</h1>
      <button onClick={()=>SetMusic('lll')}>按钮1</button>
    </div>
  )
}

export default App
