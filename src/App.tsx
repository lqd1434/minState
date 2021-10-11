import React, {useEffect} from 'react'
import './App.css'
import {useMyState, usePerson} from "./state";
import Child from "./Child";
import {observer} from "./minState/myMiniState";


const App = observer(()=> {
  const [ music, setMusic ] = useMyState()
  console.log(usePerson())
  const [name,setName,fuc] = usePerson()
  useEffect(()=>{
    console.log(name)
    fuc(1,2,3)
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
