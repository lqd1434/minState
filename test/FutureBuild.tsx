import React from 'react'

interface FutureBuildProps {
	children: React.ReactNode
}

export const FutureBuild: React.FC<FutureBuildProps> = ({ children }) => {
	console.log(children)
	return <>{children}</>
}
