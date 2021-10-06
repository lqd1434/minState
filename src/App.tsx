import React, { useState } from 'react'
import './App.css'
import {useMusicState, useMyState} from "./state";
import {creatStore} from "./minState/myMiniState";


function App() {
  const [ count, setCount ] = useMyState()
  const [ music, setMusic ] = useMusicState()
  creatStore((set => ({
    a:1,
    b:[3,5],
    c:()=>1
  })))

  return (
    <div className="App">
      <h1>{count}</h1>
      <button onClick={()=>setCount(count)}>按钮1</button>
    </div>
  )
}

export default App
