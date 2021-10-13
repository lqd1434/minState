import React, {useEffect} from "react";
import {usePerson} from "./state";

const Child = (props:any) => {

	const {id,setId,clear} = usePerson()

	useEffect(()=>{
	},[])
	return (
			<div className="App">
				<h1>{id}</h1>
				<h1>Child</h1>
				<button onClick={()=>setId(5)}>按钮1</button>
			</div>
	)
}

export default Child
