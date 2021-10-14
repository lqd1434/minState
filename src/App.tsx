import React from 'react'
import './App.css'
import Child from "./Child";
import {usePerson} from "./funcState";


const App = ()=> {
  const [state,action] = usePerson()
  console.log(state,'App')

  const handleClick = ()=>{
    // (action as any).setName('hello')
  }

  return (
    <div className="App">
      <h1>App</h1>
      <button onClick={handleClick}>按钮1</button>
      <Child/>
    </div>
  )
}

export default App
