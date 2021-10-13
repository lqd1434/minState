import React from 'react'
import './App.css'
import { usePerson} from "./state";
import Child from "./Child";


const App = ()=> {
  const {id,setId,clear} = usePerson()
  // const {name,setName} = useMusic()

  const handleClick = ()=>{
    setId(7)
    setTimeout(()=>{
      clear()
    },2000)
  }

  return (
    <div className="App">
      <h1>{id}</h1>
      {/*<h1>{name}</h1>*/}
      <button onClick={handleClick}>按钮1</button>
      {/*<button onClick={()=>setName('多想你')}>按钮2</button>*/}
      <Child/>
    </div>
  )
}

export default App
