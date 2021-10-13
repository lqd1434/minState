import React, {useEffect} from 'react'
import './App.css'
import {usePerson} from "./state";
import Child from "./Child";


const App = ()=> {
  const {id,setId,clear} = usePerson()

  const handleClick = ()=>{
    setId(7)
    setTimeout(()=>{
      clear()
    },2000)
    // const value = res[0](6)
    // console.log(value,'handleClick')
  }

  return (
    <div className="App">
      <h1>{id}</h1>
      <button onClick={handleClick}>按钮1</button>
      <Child/>
    </div>
  )
}

export default App
