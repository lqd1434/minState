import React from "react";
import {useStore} from "./minState";
import {useMyState} from "./state";

const Child = () => {

	const [ count, setCount ] = useMyState()

	console.log('Child')

	return (
			<div>
				<h1>{count}</h1>
				<button onClick={()=>setCount(8)}>按钮2</button>
			</div>
	)
}

export default Child
