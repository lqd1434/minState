import React, {Dispatch, useEffect, useState} from "react";
import {StoreType} from "./type";
import 'reflect-metadata'
import {Person} from "../state";
import {emitter} from "../EventEmiter";


let Store:StoreType = {}


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
		const funcMap = new Map<string,any>()
		funcMap.set(propKey,desc.value)
		const lastMap = Reflect.getMetadata(ACTION_KEY,target) as Map<string,any>
		if (lastMap){
			lastMap.set(propKey,desc.value)
			Reflect.defineMetadata(ACTION_KEY,lastMap,target)
		} else {
			Reflect.defineMetadata(ACTION_KEY,funcMap,target)
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
			store = create(propKey,initValue)
		}
		tempObj = target
		tempKey = propKey
		Reflect.defineMetadata(propKey,initValue,target)
	}
}

export function useInjection<T extends {}>(Class:any ){
	const person = new Class() as any
	const actionsMap = Reflect.getMetadata(ACTION_KEY,tempObj) as Map<string,any>
	const keys = [...actionsMap.keys()]
	const actions = keys.map(key=>{
		return person[key].bind(person)
	})
	let store = getStore(tempKey) as UStore<any>;
	console.log(store,'store')

	const [, setState] = useState({});

	useEffect(() => {
		//添加状态订阅,用于组件共享状态,实时更新
		if (!store!.listeners.includes(setState)) {
			store!.listeners.push(setState);
		}
		emitter.on<any>('action',(data)=>{
			console.log(data,'-------emitter')
			store.dispatch(data[tempKey])
			setState({})
		})
		//组件卸载时取消监听
		return () => {
			store!.listeners = store!.listeners.filter((setter: Dispatch<React.SetStateAction<any>>) => setter !== setState)
		}
	}, [])

	return [ store.state,...actions];
}
