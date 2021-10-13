import React, {Dispatch, useEffect, useLayoutEffect, useState} from "react";
import {StoreType} from "./type";
import 'reflect-metadata'
import {emitter} from "../EventEmiter";


let Store:StoreType = {}


/**
 * 状态类
 */
export class UStore<T extends any> {
	storeKey:string
	state: T

	constructor(storeKey:string,state:T) {
		this.storeKey = storeKey
		this.state = state
		this.dispatch = this.dispatch.bind(this)
	}

	/**
	 * 状态更新函数
	 * @param value 更新值
	 */
	dispatch(value:T){
		this.state = value
		console.log(value)
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
function create<T>(name:string,value:T):UStore<T>|null {
	if (Store[name]) {
		return null
	}
	const store = new UStore<T>(name, value);
	Store[name] = store
	return store;
}

const ACTION_KEY = 'action'

export function Action() {

	return function (target,propKey,desc){
		const originFunc = desc.value
		//修改
		desc.value = function (...args){
			const name = target.constructor.name
			const result = originFunc.apply(this, args)
			emitter.emit(name, this)
			return result
		}
		//储存
		const actions = Reflect.getMetadata(ACTION_KEY,target) as Array<string>
		if (actions){
				Reflect.defineMetadata(ACTION_KEY,[...actions,propKey],target)
			} else {
				Reflect.defineMetadata(ACTION_KEY,[propKey],target)
			}
		desc.enumerable = true
		desc.configurable = true
		return desc
	}
}

export function State(initValue:any) {
	return function (target:Object, propKey:string) {
		let store = getStore(propKey);
		const name = target.constructor.name
		if (!store){
			console.log('propKey',propKey)
			 create(name,initValue)
		}
		Reflect.defineMetadata(name,propKey,target)
	}
}

export function useInjection<T extends Object>(Class:any ):T{
	const className = (Class as Function).prototype.constructor.name
	const [, setState] = useState({});
	const stateKey = Reflect.getMetadata(className,Class.prototype) as string
	let store = getStore(className) as UStore<any>;
	const res = {[stateKey]:store.state}
	const instance = new Class() as T
	const keys = Reflect.getMetadata(ACTION_KEY,Class.prototype) as Array<string>

	keys.forEach((key)=>{
		Object.assign(res,{[key]:instance[key].bind(instance)})
	})
	console.log(Store)

	useLayoutEffect(() => {
		emitter.on<any>(className,(data)=>{
			console.log(data)
			store.dispatch(data[stateKey])
			setState({})
		})

	}, [])
	return res as T;
}
