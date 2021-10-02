import React from "react";
import {useMusicState, useMyState} from "./state";

const Child = () => {

	const [ count, setCount ] = useMyState()
	const [{name,singer}, setMusic ] = useMusicState()


	return (
			<div>
				<h1>{count}</h1>
				<h1>{name}</h1>
				<h1>{singer}</h1>
				<button onClick={()=>setCount({newValue:10})}>按钮2</button>
			</div>
	)
}

export default Child
