import {UStore} from "../myMiniState";
import {DispatchProps} from "../index";

export interface StoreType{
	[key:string]:any
}

export interface DispatchFuncType<T> {
	(value:T,callback?:(data:any)=>void):void
}
