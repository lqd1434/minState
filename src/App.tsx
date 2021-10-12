import React, {useEffect} from 'react'
import './App.css'
import {useMyState, person,usePerson} from "./state";
import Child from "./Child";
import {observer} from "./minState/myMiniState";


const App = observer(()=> {
  const [ music, setMusic ] = useMyState()
  const [id,setId,...res] = usePerson()
  console.log(res,'-------res')

  const handleClick = ()=>{
    const value = res[0](6)
    console.log(value,'handleClick')
  }

  return (
    <div className="App">
      <h1>{id}</h1>
      <button onClick={handleClick}>按钮1</button>
      <Child/>
    </div>
  )
})

export default App
