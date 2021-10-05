import {UStore} from "../myMiniState";
import {DispatchProps} from "../index";

export interface StoreType{
	[key:string]:any
}

export interface DispatchFuncType<T> {
	(value:T,callback?:(data:any)=>void):void
}

export interface UpdateFuncType<T> {
	(state:T,value:T):T
}
