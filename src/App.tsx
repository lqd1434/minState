import React, { useState } from 'react'
import './App.css'
import {useMyState} from "./state";


function App() {
  console.log('App')
  const [ count, setCount ] = useMyState()


  return (
    <div className="App">
      <h1>{count}</h1>
      <button onClick={()=>setCount({newValue:count+5})}>按钮1</button>
    </div>
  )
}

export default App
