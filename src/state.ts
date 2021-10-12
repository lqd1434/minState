// import {createStore} from "./minState";

import {Action, ObserveAble, State, useInjection, useStore} from "./minState/myMiniState"

export const useMyState =()=>{

	return useStore<Music>('music',{
		name:'剑心',
		singer:'李易峰'
	})
}


class Music{

	name: string | undefined
	singer: string | undefined
}

// @ObserveAble
class Person {
	@State()
	name:string = 'jack'

	@Action()
	setName(name:any,fun:any){
		console.log(name,'kkkkkkkkkkkkkk')
	}
}
export const person = new Person()
console.log(person.name)
person.name = 'bob'

export const usePerson =()=>{
	return useInjection(Person)
}
