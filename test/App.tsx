import React from 'react'
import './App.css'
import Child from './Child'
import './state/proxyState'
import { usePerson } from './state/proxyState'

const App = () => {
	const person = usePerson()

	const handleClick = () => {
		person.name = 'jackkk'
	}

	return (
		<div className="App">
			<h1>App</h1>
			<h1>{person.name}</h1>
			<button onClick={handleClick}>按钮1</button>
			<Child />
		</div>
	)
}

export default App
