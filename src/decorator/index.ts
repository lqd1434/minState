import {emitter} from "../EventEmiter";


function test(target:Function) {
	target.prototype.name = '8'
	console.log(new Date().getMilliseconds())

	console.log(Object.getOwnPropertyDescriptor(target.prototype, 'name'));
	// return target.test = false
}

export function test2(...props){
	console.log(props)
	console.log(new Date().getMilliseconds(),'2')
}

// @test
// export class DEC {
// 	@test2
// 	name:string = ''
// 	age:number = 0
// }
