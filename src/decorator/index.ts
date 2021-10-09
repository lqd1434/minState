import {emitter} from "../EventEmiter";
import {JudgmentType, TypeEnums} from "../minState/utils/judgment";

export let store:Object[] = []


export function test<T>(initValue:T){
	console.log(initValue)
	return (...props)=>{
		console.log(props)
		const key = props[1]
		let tmpObj:Object
		if (JudgmentType(initValue) === TypeEnums.Func){
			const updateFunc = (value)=>{
				(initValue as unknown as Function)(value)
				console.log('成功改写')
				return value
			}
			tmpObj = {[key]:updateFunc}
		} else {
			tmpObj = {[key]:initValue}
		}
		store.push(tmpObj)
		console.log(store)
		if (store.length===2){
			console.log('成功')
			// store.length = 0
		}
	}
}
