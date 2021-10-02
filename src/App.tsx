import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import {createStore, useStore} from "./minState";
import {useMyState} from "./state";

// createStore('countStore', 0);
function App() {
  console.log('App')
  const [ count, setCount ] = useMyState()

  return (
    <div className="App">
      <h1>{count}</h1>
      <button onClick={()=>setCount(5)}>按钮1</button>
    </div>
  )
}

export default App
