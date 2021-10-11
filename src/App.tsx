import React, {useEffect} from 'react'
import './App.css'
import {useMyState, usePerson} from "./state";
import Child from "./Child";
import {observer} from "./minState/myMiniState";


const App = observer(()=> {
  const [ music, setMusic ] = useMyState()
  const [name,setName] = usePerson()
  useEffect(()=>{
    console.log(name)
  })


  return (
    <div className="App">
      <h1>{music.singer}</h1>
      <h1>{name}</h1>
      <button onClick={()=>setName('李易峰')}>按钮1</button>
      <Child/>
    </div>
  )
})

export default App
