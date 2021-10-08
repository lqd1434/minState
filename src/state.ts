// import {createStore} from "./minState";

import { useStore} from "./minState/myMiniState"
import {test2} from "./decorator";

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

	@test2
	name:string = ''
	// age:number = 10
	// arr:number[] = [1,2,4]
	@test2
	setName:Function = function (value){}
}

export const myStateClass = new StateClass()
