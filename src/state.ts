// import {createStore} from "./minState";

import {creatStore, useStore} from "./minState/myMiniState"

export const useMyState =()=>{

	return useStore<number>('count',0,({state,value}) =>value+5 )
}

export const useMusicState =()=>{

	return creatStore<string>(()=>({
		music:'明天',
		setMusic:({state, value})=>value
	}))
}

interface Music{
	name:string
	singer:string
}
