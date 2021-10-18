import React from 'react'
import './App.css'
import Child from './Child'
import { usePerson } from './state/funcState'

const App = () => {
	const { name, setName } = usePerson((state) => state)

	const handleClick = () => {
		setName('hello')
	}

	console.log('1,2,3'.split(','))
	return (
		<div className="App">
			<h1>App</h1>
			<h1>{name}</h1>
			<button onClick={handleClick}>按钮1</button>
			<Child />
		</div>
	)
}

export default App
