import React, {useEffect, useState} from 'react'
import './App.css'
import {myStateClass, useMyState} from "./state";
import {store} from "./decorator";


function App() {
  const [ music, setMusic ] = useMyState()

  useEffect(()=>{
    console.log(myStateClass)
    console.log(myStateClass.name)
    myStateClass.setName?.('88','99')
  })

  return (
    <div className="App">
      <h1>{myStateClass.name}</h1>
      <h1>{music.singer}</h1>
      <button onClick={()=>setMusic({name:'剑心5',
        singer:'李易峰2'})}>按钮1</button>
    </div>
  )
}

export default App
