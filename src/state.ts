// import {createStore} from "./minState";

import { useStore } from "./minState/myMiniState"

export const useMyState =()=>{

	return useStore<number>('count',0,({state,value}) =>value+5 )
}

export const useMusicState =()=>{

	return useStore<Music>('music',{name:'',singer:''})
}

interface Music{
	name:string
	singer:string
}
