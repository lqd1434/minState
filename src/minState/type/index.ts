import {UStore} from "../descStore";
import {DispatchProps} from "../utils/origin";

export interface StoreType{
	[key:string]:any
}

export interface DispatchFuncType<T> {
	(value:T,callback?:(data:any)=>void):void
}
export type UpdateFuncProps<T> = {
	state: T,
	value: T
}
export type UpdateFuncType<T> = (state: T, value: T)=>T

