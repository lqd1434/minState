import {emitter} from "../EventEmiter";
import {JudgmentType, TypeEnums} from "../minState/utils/judgment";
// import {storedec} from "../minState/myMiniState";

export let store:Object = {}


function classDec(constructor:{new ():any}){
	// console.log(storedec,'class----')
	const handle = {
		set(target,key,value){
			console.log('---------------')
			console.log(target,key,value)
			console.log('---------------')
			Reflect.set(target,key,value)
		}
	}
	return constructor
}

function funcDec() {
	return function (target,propKey,dec){
		console.log(store)
		store[propKey] = dec.value
		dec.enumerable = true
	}
}

function paramDec(initValue:any) {
	return function (target,propKey){
		console.log(propKey)
		store[propKey] = initValue
	}
}

@classDec
class Person{
	@paramDec('jack')
	name: string | undefined

	@funcDec()
	setName(){
		console.log(this.name)
	}
}

// export const person = new Person()



// export function test<T>(initValue:T){
// 	console.log(initValue)
// 	return (...props)=>{
// 		console.log(props)
// 		const key = props[1]
// 		let tmpObj:Object
// 		if (JudgmentType(initValue) === TypeEnums.Func){
// 			const updateFunc = (value)=>{
// 				(initValue as unknown as Function)(value)
// 				console.log('成功改写')
// 				return value
// 			}
// 			tmpObj = {[key]:updateFunc}
// 		} else {
// 			tmpObj = {[key]:initValue}
// 		}
// 		store.push(tmpObj)
// 		console.log(store)
// 		if (store.length===2){
// 			console.log('成功')
// 			// store.length = 0
// 		}
// 	}
// }
