import {UStore} from "../myMiniState";
import {DispatchProps} from "../index";

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
export type UpdateFuncType<T> = (props:UpdateFuncProps<T>)=>T

export type Test<T> = {
	[K in keyof T]:T[K]
}
