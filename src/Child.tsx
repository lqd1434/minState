import React, {useEffect} from "react";
import {usePerson} from "./funcState";

const Child = () => {
	const {name,setName} = usePerson((state => state))
	return (
			<div className="App">
				<h1>Child</h1>
				<h1>{name}</h1>
				<button onClick={()=>{}}>按钮1</button>
			</div>
	)
}

export default Child
