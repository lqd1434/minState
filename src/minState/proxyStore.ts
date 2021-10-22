import { CreateStateType, GetStateType, StoreType } from './type'
import 'reflect-metadata'
import { useEffect, useRef, useState } from 'react'
import { emitter } from './utils/EventEmiter'

const Store: StoreType = {}

/**
 * 状态类
 */
export class UStore<T extends any> {
	storeKey: string
	state: T

	constructor(storeKey: string, state: T) {
		this.storeKey = storeKey
		this.state = state
		this.dispatch = this.dispatch.bind(this)
	}

	/**
	 * 状态更新函数
	 * @param state 更新值
	 */
	dispatch(state: Object) {
		Object.keys(state).forEach((key) => {
			this.state[key] = state[key]
		})
	}
}

/**
 * 获取状态
 * @param storeKey 状态命名空间
 */
function _getStore<T>(storeKey: string) {
	const name = storeKey
	if (!Store[name]) {
		return null
	}
	return Store[name] as UStore<T>
}

/**
 * 创建一个新状态(内部)
 * @param name 状态命名空间
 * @param value 状态初始值
 */
function _create<T>(name: string, value: T): UStore<T> | null {
	if (Store[name]) {
		return null
	}
	const store = new UStore<T>(name, value)
	Store[name] = store
	return store
}

function _equal(uniqueName: string, newState: Object): string[] {
	const { state } = _getStore(uniqueName) as UStore<Object>
	const stateKeys = Object.keys(newState)
	const changeKeys: string[] = []
	stateKeys.forEach((key) => {
		if (state[key] !== newState[key]) {
			changeKeys.push(key)
		}
	})
	//返回改变的键的map集合
	return changeKeys
}

export function create<T extends Object>(state: T) {
	const handler = {
		/**
		 *
		 * @param targetObj 第一个参数是目标对象
		 * @param key 第二个是要获取的属性名
		 * @param proxy 第三个是代理对象
		 */
		get(targetObj, key, proxy) {
			return Reflect.get(targetObj, key, proxy)
		},
		/**
		 * @param targetObj 第一个参数是目标对象
		 * @param key 第二个是要获取的属性名
		 * @param value 第二个是要获取的属性名
		 * @param proxy 第三个是代理对象
		 */
		set(targetObj, key, value, proxy) {
			emitter.emit<null>('update', null)
			return Reflect.set(targetObj, key, value, proxy)
		},
	}

	return () => {
		const proxyStateRef = useRef<Object>()
		const storeRef = useRef<UStore<any>>()
		if (!proxyStateRef.current) {
			proxyStateRef.current = new Proxy(state, handler)
		}
		const uniqueName = Reflect.ownKeys(state).join('')
		if (storeRef.current === undefined) {
			storeRef.current = _getStore(uniqueName)
			if (storeRef.current === null) {
				storeRef.current = _create(uniqueName, proxyStateRef.current)
			}
		}

		const store = storeRef.current as UStore<any>

		const [, setState] = useState({})

		useEffect(() => {
			emitter.on<null>('update', () => {
				setState({})
			})
		}, [])

		return store.state as T
	}
}
