// import {createStore} from "./minState";

import { useStore} from "./minState/myMiniState"
import {test} from "./decorator";

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


const UpdateFuncs = {
	setName: (state,value)=>{
		console.log(value)
	return value}
}


class StateClass{

	@test<string>('name1')
	name: string | undefined
	@test<Function>( UpdateFuncs.setName)
	setName: Function | undefined
}

export const myStateClass = new StateClass()
