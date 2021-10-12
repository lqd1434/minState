import React, {useEffect} from 'react'
import './App.css'
import {useMyState, person} from "./state";
import Child from "./Child";
import {observer} from "./minState/myMiniState";


const App = observer(()=> {
  const [ music, setMusic ] = useMyState()
  useEffect(()=>{
    person.setName('jack',1)
    console.log(person);
    console.log(Object.getPrototypeOf(person));
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
