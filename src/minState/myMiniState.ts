import React, {Dispatch, useEffect, useState} from "react";
import {DispatchFuncType, StoreType, UpdateFuncType} from "./type";
import {JudgmentType, TypeEnums} from "./utils/judgment";
import 'reflect-metadata'
import {Person} from "../state";
import {emitter} from "../EventEmiter";


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
	updateFunc:UpdateFuncType<T>
	actions:Map<string,any>

	constructor(storeKey:string,state:T,updateFunc: UpdateFuncType<T>) {
		this.storeKey = storeKey
		this.state = state
		this.listeners = []
		this.updateFunc = updateFunc
		this.dispatch = this.dispatch.bind(this)
		this.actions = new Map<string, any>()
	}

	/**
	 * 状态更新函数
	 * @param value 更新值
	 * @param callback 回调,可获得更新后的值
	 */
	dispatch(value:T,callback?:(data:any)=>void){
		const {state,listeners} = this
		console.log(JudgmentType(this.updateFunc))
		if (JudgmentType(this.updateFunc) === TypeEnums.Func){
			this.state = (this.updateFunc as Function)(state, value)
		} else {

		}
		listeners.forEach((listener)=>{
			listener(this.state)
		})

		if (callback){
			callback(this.state)
		}
	}

	addActions(actions:Map<string, any>){
		actions.forEach((value,key)=>{
			this.actions.set(key,value)
		})
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
 * @param reducer 状态更新方式
 */
function create<T>(name:string,value:T,reducer:UpdateFuncType<T>):UStore<T>|null {
	if (Store[name]) {
		return null
	}
	const store = new UStore<T>(name, value, reducer);
	Store[name] = store
	return store;
}


/**
 * 用于组件获取状态
 * @param name 状态
 * @param value 初始值
 * @param reducer 状态更新方式
 */
export function useStore<T>(name:string,value:T,reducer?:UpdateFuncType<T>):[T,DispatchFuncType<T>]{
	let store = getStore<T>(name);
	if (!store){
		store = create<T>(name,value, reducer?? defaultUpdateFunc)
	}
	store = store as UStore<T>
	// console.log(store,'useStore')
	const [state, setState] = useState<T>(store.state);

	useEffect(() => {
		//添加状态订阅,用于组件共享状态,实时更新
		if (!store!.listeners.includes(setState)) {
			store!.listeners.push(setState);
		}
		//组件卸载时取消监听
		return () => {
			store!.listeners = store!.listeners.filter((setter: Dispatch<React.SetStateAction<T>>) => setter !== setState)
		}
	}, [])


	return [ state, store.dispatch];
}

export function observer(component:any){

	// console.log('调用了observer')
	return component
}


let tempKey:string = ''
let tempObj = {}
export function ObserveAble(target:{new ():any}){
	console.log(tempKey,'ObserveAble')

}
const STATE_KEY = 'state'
const ACTION_KEY = 'action'

export function Action() {

	return function (target,propKey,desc){
		const originFunc = desc.value
		//修改
		desc.value = function (...args){
			console.log(args)
			const result = originFunc.apply(this, args)
			console.log(this)
			emitter.emit('action',propKey)
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
			store = create(propKey,initValue,  defaultUpdateFunc)
		}
		tempObj = target
		tempKey = propKey
		Reflect.defineMetadata(propKey,initValue,target)
	}
}

export function useInjection<T extends {}>(Class:any ){
	const person = new Class() as Person
	// person.setId(5)
	const actions = Reflect.getMetadata(ACTION_KEY,tempObj) as Map<string,any>
	const value = Reflect.getOwnMetadata(tempKey,tempObj)
	let store = getStore(tempKey) as UStore<any>;
	store.addActions(actions)
	console.log(store,'store')
	console.log('tempKey--⚠️',value)
	// console.log(store,'useStore')
	const [, setState] = useState({});

	useEffect(() => {
		//添加状态订阅,用于组件共享状态,实时更新
		if (!store!.listeners.includes(setState)) {
			store!.listeners.push(setState);
		}

		emitter.on<any>('action',(data)=>{
			console.log(data,'-------emitter')
			store.dispatch(99)
			setState({})
		})
		//组件卸载时取消监听
		return () => {
			store!.listeners = store!.listeners.filter((setter: Dispatch<React.SetStateAction<any>>) => setter !== setState)
		}
	}, [])

	return [ store.state, store.dispatch,...actions.values()];
}
