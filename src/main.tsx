import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import Child from "./Child";

ReactDOM.render(
  <React.StrictMode>
    <App />
    <Child/>
  </React.StrictMode>,
  document.getElementById('root')
)
