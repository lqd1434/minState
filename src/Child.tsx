import React from "react";
import {useMyState} from "./state";

const Child = () => {

	const [ music, setMusic ] = useMyState()

	return (
			<div className="App">
				<h1>{music.name}</h1>
				<h1>{music.singer}</h1>
				<h1>Child</h1>
				<button onClick={()=>setMusic({name:'剑心5',
					singer:'李易峰2'})}>按钮1</button>
			</div>
	)
}

export default Child
