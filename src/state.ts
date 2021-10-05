import {createStore} from "./minState";

export const useMyState =()=>{

	return createStore<number>({name:'count',value:0})
}

export const useMusicState =()=>{

	return createStore<Music>({name:'music',value: {name:'',singer:''}})
}

interface Music{
	name:string
	singer:string
}
