import React from 'react'
import './App.css'
import Child from "./Child";
import {useMusic} from "./state";


const App = ()=> {
 const {musicName,setName} = useMusic()

  const handleClick = ()=>{
      setName('hello')
  }

  return (
    <div className="App">
      <h1>App</h1>
      <h1>{musicName}</h1>
      <button onClick={handleClick}>按钮1</button>
      <Child/>
    </div>
  )
}

export default App
