import React from 'react'
import './App.css'
import Child from "./Child";
import {useMusic} from "./devState";


const App = ()=> {
  const {musicName,setName,singer,setSinger} = useMusic()

  const handleClick = ()=>{
    setName('hello')
  }

  return (
    <div className="App">
      <h1>{musicName}</h1>
      <h1>{singer}</h1>
      <button onClick={handleClick}>按钮1</button>
      <button onClick={()=>setSinger('多想你')}>按钮2</button>
      <Child/>
    </div>
  )
}

export default App
