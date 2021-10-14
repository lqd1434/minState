import {useEffect, useState} from "react";
import {StoreType} from "./type";
import 'reflect-metadata'
import {JudgmentType, TypeEnums} from "./utils/judgment";
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
	 * @param state 更新值
	 */
	dispatch(state:Object){
		Object.keys(state).forEach((key)=>{
			this.state[key] = state[key]
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
 */
function _create<T>(name:string,value:T):UStore<T>|null {
	if (Store[name]) {
		return null
	}
	const store = new UStore<T>(name, value);
	Store[name] = store
	return store;
}


type CreateStateType<T> = (set:(state:Partial<T>)=>Partial<T>)=>T

export function create<T extends Object>(createState:CreateStateType<T>) {

	return (getState: (state: T) => T) => {
		const setFunc = (state: Partial<T>): Partial<T> => {
			emitter.emit<Partial<T>>(uniqueName, state)
			return state
		}
		const stateObj = createState(setFunc)

		const keys = Object.keys(stateObj)
		const uniqueName = keys.join('')
		const state = {}
		const actions = {}

		keys.forEach((key) => {
			if (!(JudgmentType(stateObj[key]) === TypeEnums.Func)) {
				Object.assign(state, {[key]: stateObj[key]})
			} else {
				Object.assign(actions, {[key]: stateObj[key]})
			}
		})

		//获取或者创建store
		let store = getStore<Object>(uniqueName)
		if (!store) {
			store = _create<Object>(uniqueName, state)
		}

		const [, setState] = useState({})
		useEffect(() => {
			emitter.on<Partial<T>>(uniqueName, (data) => {
				store?.dispatch((data as Object))
				setState({})
			})
		}, [])

		const $state = Object.assign({}, store?.state, actions) as T
		return getState($state)
	}
}

