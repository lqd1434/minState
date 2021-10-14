import React from 'react'
import './App.css'
import Child from "./Child";
import {useMusic, usePerson} from "./funcState";


const App = ()=> {
  const {name,setName} = usePerson((state => state))
 const {musicName,setMusicName} = useMusic((state => state))

  const handleClick = ()=>{
      setName('hello')
    setMusicName('hello')
  }

  return (
    <div className="App">
      <h1>App</h1>
      <h1>{name}</h1>
      <h1>{musicName}</h1>
      <button onClick={handleClick}>按钮1</button>
      <Child/>
    </div>
  )
}

export default App
