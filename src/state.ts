import {createStore, DispatchType} from "./minState";

export const useMyState =():[number,(data:DispatchType<number>)=>void ]=>{

	return createStore<number>({name:'count',value:0})
}
