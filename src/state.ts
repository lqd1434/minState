// import {createStore} from "./minState";

import {Action, State, useInjection} from "./minState/myMiniState"

// export const useMyState =()=>{
//
// 	return useStore<Music>('music',{
// 		name:'剑心',
// 		singer:'李易峰'
// 	})
// }
//
//
// class Music{
//
// 	name: string | undefined
// 	singer: string | undefined
// }

class Person {
	@State(1)
	id: number | undefined

	@Action()
	setId(value:number){
		this.id = value
	}

	@Action()
	clear(){
		this.id = 0
	}
}

class Music{

	@State('')
	MusicName:string|undefined

	@Action()
	setName(value:string){
		this.MusicName = value
	}
}

export const usePerson =()=>{
	return useInjection<Person>(Person)
}

export const useMusic =()=>{
	return useInjection<Music>(Music)
}
