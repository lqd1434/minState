import React from 'react'
import './App.css'
import Child from "./Child";
import {usePerson} from "./funcState";


const App = ()=> {
  const {name,setName} = usePerson((state => state))
  console.log(name,'App')

  const handleClick = ()=>{
      setName('hello')
  }

  return (
    <div className="App">
      <h1>App</h1>
      <h1>{name}</h1>
      <button onClick={handleClick}>按钮1</button>
      <Child/>
    </div>
  )
}

export default App
