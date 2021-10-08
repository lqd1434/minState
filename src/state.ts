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

class StateClass{

	@test<string>('name1')
	name: string | undefined

	@test<Function>( function (value){})
	setName:Function = function (value){}
}

export const myStateClass = new StateClass()
