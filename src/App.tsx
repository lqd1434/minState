import React, {useEffect} from 'react'
import './App.css'
import {useMyState, person,usePerson} from "./state";
import Child from "./Child";
import {observer} from "./minState/myMiniState";
// import './minState/test'


const App = observer(()=> {
  const [ music, setMusic ] = useMyState()
  usePerson()
  useEffect(()=>{
    person.setId(1)
  })


  return (
    <div className="App">
      <h1>{music.singer}</h1>
      {/*<h1>{name}</h1>*/}
      <button onClick={()=>{}}>按钮1</button>
      <Child/>
    </div>
  )
})

export default App
