import React, {Dispatch, useEffect, useState} from "react";
import {DispatchFuncType, StoreType} from "./type";


let Store:StoreType = {}

function defaultUpdateFunc<T>(value:T){
	return value
}

export class UStore<T extends any> {
	storeKey:string
	state: T
	listeners: Dispatch<React.SetStateAction<T>>[]
	updateFunc?:any

	constructor(storeKey:string,state:T,updateFunc=defaultUpdateFunc) {
		this.storeKey = storeKey
		this.state = state
		this.listeners = []
		this.updateFunc = updateFunc
		this.dispatch = this.dispatch.bind(this)
	}

	dispatch(value:T,callback?:(data:any)=>void){
		const {listeners} = this
		this.state = this.updateFunc(value)
		listeners.forEach((listener)=>{
			listener(this.state)
		})
	}

}

function getStore<T>(storeKey: string) {
	const name = storeKey;
	if (!Store[name]) {
		return  null
	}
	return Store[name] as UStore<T>;
}

function create<T>(name:string,value:T,reducer?:any):UStore<T>|null {
	if (Store[name]) {
		return null
	}
	const store = new UStore<T>(name, value, reducer);
	Store[name] = store
	console.log(Store)
	return store;
}

export function createStore<T>(name:string,value:T):[T,DispatchFuncType<T>]{
	let store = getStore<T>(name);
	if (!store){
		console.log(name,value)
		store = create<T>(name,value)
	}
	store = store as UStore<T>
	const [state, setState] = useState<T>(store.state);

	useEffect(() => {
		//添加状态订阅,用于组件共享状态
		if (!store!.listeners.includes(setState)) {
			store!.listeners.push(setState);
		}
		//组件卸载时取消监听
		return () => {
			store!.listeners = store!.listeners.filter((setter: Dispatch<React.SetStateAction<T>>) => setter !== setState)
		}
	}, [])

	return [ state, store.dispatch ];
}
