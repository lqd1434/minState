import { useLayoutEffect, useState} from "react";
import {StoreType} from "./type";
import 'reflect-metadata'
import {emitter} from "../EventEmiter";

/**
 * 存储状态的大对象
 */
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

/**
 * 更新函数装饰器,只有通过更新函数才能触发状态更新
 * @constructor
 */
export function Action() {

	return function (target,propKey,desc){
		const originFunc = desc.value
		const name = target.constructor.name
		//修改
		desc.value = function (...args){
			const result = originFunc.apply(this, args)
			emitter.emit(name, this)
			return result
		}
		//储存
		const actions = Reflect.getMetadata(`${name}:action`,target) as Array<string>
		if (actions){
				Reflect.defineMetadata(`${name}:action`,[...actions,propKey],target)
			} else {
				Reflect.defineMetadata(`${name}:action`,[propKey],target)
			}
		desc.enumerable = true
		desc.configurable = true
		return desc
	}
}

/**
 * 状态值装饰器
 * @param initValue 初始值
 * @constructor
 */
export function State<T>(initValue:T) {
	return function (target:Object, propKey:string) {
		const name = target.constructor.name
		let store = getStore(name);
		if (!store){
			 create(name,initValue)
		}
		Reflect.defineMetadata(`${name}:state`,propKey,target)
	}
}

/**
 * 返回原对象的响应式包装,调用action函数触发状态更新
 * @param Class
 */
export function useInjection<T extends Object>(Class:any ):T{
	const className = (Class as Function).prototype.constructor.name
	const [, setState] = useState({});
	const stateKey = Reflect.getMetadata(`${className}:state`,Class.prototype) as string
	let store = getStore(className) as UStore<any>;
	const res = {[stateKey]:store.state}
	const instance = new Class() as T
	const keys = Reflect.getMetadata(`${className}:action`,Class.prototype) as Array<string>
	console.log(Store)
	keys.forEach((key)=>{
		Object.assign(res,{[key]:instance[key].bind(instance)})
	})
	useLayoutEffect(() => {
		emitter.on<T>(className,(data)=>{
			store.dispatch(data[stateKey])
			setState({})
		})

	}, [])
	return res as T;
}
