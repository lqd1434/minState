import React, {useEffect} from "react";
import {useMusic} from "./state";

const Child = (props:any) => {

	const {musicName,setName} = useMusic()
	console.log(musicName,'Child')
	return (
			<div className="App">
				<h1>{musicName}</h1>
				<h1>Child</h1>
				<button onClick={()=>setName('Child')}>按钮1</button>
			</div>
	)
}

export default Child
