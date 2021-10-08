import {emitter} from "../EventEmiter";

let store = {}


export function test<T>(initValue:T){
	console.log(initValue)
	// sessionStorage.setItem(key)
	return (...props)=>{
		console.log(props[1])
		store[props[1]] = initValue
		console.log(store)
		// sessionStorage.setItem(props[1],initValue)
	}
}

// @test
// export class DEC {
// 	@test2
// 	name:string = ''
// 	age:number = 0
// }
