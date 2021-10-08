import React, { useState } from 'react'
import './App.css'
import { useMyState} from "./state";


function App() {
  const [ music, setMusic ] = useMyState()

  return (
    <div className="App">
      <h1>{music.name}</h1>
      <h1>{music.singer}</h1>
      <button onClick={()=>setMusic({name:'剑心5',
        singer:'李易峰2'})}>按钮1</button>
    </div>
  )
}

export default App
