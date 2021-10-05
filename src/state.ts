// import {createStore} from "./minState";

import { createStore } from "./minState/myMiniState"

export const useMyState =()=>{

	return createStore<number>('count',0)
}

export const useMusicState =()=>{

	return createStore<Music>('music',{name:'',singer:''})
}

interface Music{
	name:string
	singer:string
}
