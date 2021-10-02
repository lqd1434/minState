import React from "react";
import {useMyState} from "./state";

const Child = () => {

	const [ count, setCount ] = useMyState()

	console.log('Child')

	return (
			<div>
				<h1>{count}</h1>
				<button onClick={()=>setCount({newValue:10})}>按钮2</button>
			</div>
	)
}

export default Child
