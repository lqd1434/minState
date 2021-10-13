import React, {useEffect} from "react";
import {useMusic} from "./devState";

const Child = (props:any) => {

	const {musicName,setName} = useMusic()


	useEffect(()=>{
	},[])
	return (
			<div className="App">
				<h1>{musicName}</h1>
				<h1>Child</h1>
				<button onClick={()=>setName('Child')}>按钮1</button>
			</div>
	)
}

export default Child
