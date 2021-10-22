import React, { useEffect } from 'react'
import { usePerson } from './state/proxyState'

const Child = () => {
	const person = usePerson((state) => state)
	console.log('Child')
	return (
		<div className="App">
			<h1>Child</h1>
			<h1>{person.name}</h1>
			<button onClick={() => {}}>按钮1</button>
		</div>
	)
}

export default Child
