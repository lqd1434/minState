import React from 'react'
import { usePerson } from './state/proxyState'

interface FutureBuildProps {
	children: React.ReactNode
}

export const FutureBuild: React.FC<FutureBuildProps> = ({ children }) => {
	console.log(children)
	const person = usePerson()
	console.log(person, 'FutureBuild')
	return (
		<div>
			<h2>FutureBuild</h2>
		</div>
	)
}
