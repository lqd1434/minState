import React from 'react'
import './App.css'
import Child from './Child'
import './state/proxyState'
import { usePerson } from './state/proxyState'
import { Route, Switch, useHistory } from 'react-router-dom'
import { FutureBuild } from './FutureBuild'

const App = () => {
	const person = usePerson((state) => state)
	const history = useHistory()

	const handleClick = () => {
		person.name = 'jackkk'
	}

	return (
		<div className="App">
			<h1>App</h1>
			<h1>{person.name}</h1>
			<button onClick={handleClick}>按钮1</button>
			<button onClick={() => history.push('/test')}>按钮2</button>
			<Switch>
				<Route path={'/test'} component={FutureBuild} exact />
			</Switch>
			<Child />
		</div>
	)
}

export default App
