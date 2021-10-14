import React, {Dispatch, useEffect, useState} from "react";
import {CreateType, DispatchFuncType, StoreType, UpdateFuncType} from "./type";
import 'reflect-metadata'
import {JudgmentType, TypeEnums} from "./utils/judgment";


let Store:StoreType = {}

function defaultUpdateFunc<T extends any>(state:T,value:T):T{
	return value
}

/**
 * 状态类
 */
export class UStore<T extends any> {
	storeKey:string
	state: T
	listeners: Dispatch<React.SetStateAction<T>>[]

	constructor(storeKey:string,state:T) {
		this.storeKey = storeKey
		this.state = state
		this.listeners = []
		this.dispatch = this.dispatch.bind(this)
	}

	/**
	 * 状态更新函数
	 * @param value 更新值
	 * @param callback 回调,可获得更新后的值
	 */
	dispatch(value:T,callback?:(data:any)=>void){
		this.state = value
		if (callback){
			callback(this.state)
		}
	}

}

/**
 * 获取状态
 * @param storeKey 状态命名空间
 */
function getStore<T>(storeKey: string) {
	const name = storeKey;
	if (!Store[name]) {
		return  null
	}
	return Store[name] as UStore<T>;
}

/**
 * 创建一个新状态(内部)
 * @param name 状态命名空间
 * @param value 状态初始值
 */
function _create<T>(name:string,value:T):UStore<T>|null {
	if (Store[name]) {
		return null
	}
	const store = new UStore<T>(name, value);
	Store[name] = store
	return store;
}


// /**
//  * 用于组件获取状态
//  * @param createState
//  */
// export function useStore<T>(name:string,value:T,reducer?:UpdateFuncType<T>):[T,DispatchFuncType<T>]{
// 	let store = getStore<T>(name);
// 	if (!store){
// 		store = _create<T>(name,value, reducer?? defaultUpdateFunc)
// 	}
// 	store = store as UStore<T>
// 	// console.log(store,'useStore')
// 	const [state, setState] = useState<T>(store.state);
//
// 	useEffect(() => {
// 		//添加状态订阅,用于组件共享状态,实时更新
// 		if (!store!.listeners.includes(setState)) {
// 			store!.listeners.push(setState);
// 		}
// 		//组件卸载时取消监听
// 		return () => {
// 			store!.listeners = store!.listeners.filter((setter: Dispatch<React.SetStateAction<T>>) => setter !== setState)
// 		}
// 	}, [])
//
//
// 	return [ state, store.dispatch];
// }

export function create<T extends Object>(createState:T) {
	const keys = Object.keys(createState)
	const uniqueName = keys.join('')
	const state = {}
	keys.forEach((key)=>{
		if (!(JudgmentType(createState[key]) === TypeEnums.Func)){
			Object.assign(state,{[key]:createState[key]})
		}
	})
	console.log(state)
	let store = getStore<Object>(uniqueName)
	if (!store){
		store = _create<Object>(uniqueName,state)
	}
	store = store as UStore<any>
	//
	// actionKeys.forEach((key)=>{
	// 	const originFunc = action[key]
	// 	action[key] = function (...args){
	// 		originFunc.apply({}, [state,...args])
	// 		_update({})
	// 	}
	// })
	//
	// const [_state, setState] = useState<any>(store.state);
	// const [, _update] = useState<any>({});
	//
	// useEffect(()=>{
	//
	// },[])

	return [state,state]
}

