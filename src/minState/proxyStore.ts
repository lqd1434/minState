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

function _equal(uniqueName: string, key: string, value: any): boolean {
	const { state } = _getStore(uniqueName) as UStore<Object>
	return state[key] !== value //不同返回true,需要render
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
			const uniqueName = Reflect.ownKeys(targetObj).join('')
			const needRender = _equal(uniqueName, key, value)
			let res = true
			if (needRender) {
				res = Reflect.set(targetObj, key, value, proxy)
				emitter.emit<null>('update', null)
			}
			return res
		},
	}

	return <SliceState>(getState: GetStateType<T, SliceState>) => {
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

		return getState(store.state as T)
	}
}
