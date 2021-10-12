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
	@State(1)
	id: number | undefined


	@Action()
	setId(value:number){
		console.log(value,'setId')
	}
}
export const person = new Person()


export const usePerson =()=>{
	const value = useInjection(Person)
	console.log(value)
	return useInjection(Person)
}
