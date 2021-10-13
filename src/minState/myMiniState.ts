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

let tempKey:string = ''
let tempObj = {}

const ACTION_KEY = 'action'

export function Action() {

	return function (target,propKey,desc){
		const originFunc = desc.value
		//修改
		desc.value = function (...args){
			const result = originFunc.apply(this, args)
			emitter.emit('action', this)
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
		if (!store){
			 create(propKey,initValue)
		}
		tempObj = target
		tempKey = propKey
	}
}

export function useInjection<T extends Object>(Class:any ):T{
	console.log(tempKey)
	console.log(tempObj)
	const [, setState] = useState({});
	let store = getStore(tempKey) as UStore<any>;
	const res = {[tempKey]:store.state}
	const instance = new Class() as T
	const keys = Reflect.getMetadata(ACTION_KEY,tempObj) as Array<string>

	keys.forEach((key)=>{
		Object.assign(res,{[key]:instance[key].bind(instance)})
	})

	useLayoutEffect(() => {
		emitter.on<any>('action',(data)=>{
			store.dispatch(data[tempKey])
			setState({})
		})

	}, [])
	return res as T;
}
