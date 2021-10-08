// import {createStore} from "./minState";

import { useStore} from "./minState/myMiniState"

export const useMyState =()=>{

	return useStore<Music>('music',{
		name:'剑心',
		singer:'李易峰'
	})
}


interface Music{
	name:string
	singer:string
}
