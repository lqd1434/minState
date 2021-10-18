import { useCallback, useEffect, useRef, useState } from 'react'
import { CreateStateType, GetStateType, StoreType } from './type'
import 'reflect-metadata'
import { JudgmentType, TypeEnums } from './utils/judgment'
import { useEventEmitter } from './utils/EventEmiter'

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

export function create<T extends Object>(createState: CreateStateType<T>) {
	return <SliceState>(getState: GetStateType<T, SliceState>) => {
		//缓存值
		const storeRef = useRef<any>()
		const stateRef = useRef<Object>()
		const actionRef = useRef<Object>()
		const receiveObjRef = useRef<Object>()
		const emitter = useEventEmitter()

		//缓存set函数
		const setFunc = useCallback((state: Partial<T>): Partial<T> => {
			const changeKeys = _equal(uniqueName, state as Object)
			if (changeKeys.length !== 0) {
				emitter.emit<Partial<T>>(uniqueName, state)
			}
			return state
		}, [])

		if (!receiveObjRef.current) {
			receiveObjRef.current = createState(setFunc)
		}
		const receivedState = receiveObjRef.current as Object
		const keys = Object.keys(receivedState)
		const uniqueName = keys.join('')

		if (!stateRef.current) {
			stateRef.current = {}
			actionRef.current = {}
			keys.forEach((key) => {
				if (!(JudgmentType(receivedState[key]) === TypeEnums.Func)) {
					Object.assign(stateRef.current, { [key]: receivedState[key] })
				} else {
					Object.assign(actionRef.current, { [key]: receivedState[key] })
				}
			})
		}

		//获取或者创建store
		if (storeRef.current === undefined) {
			storeRef.current = _getStore(uniqueName)
			if (storeRef.current === null) {
				storeRef.current = _create(uniqueName, stateRef.current)
			}
		}
		const store = storeRef.current

		const [, setState] = useState({})

		//监听set调用,更新组件状态
		useEffect(() => {
			emitter.on<Partial<T>>(uniqueName, (data) => {
				store?.dispatch(data as Object)
				setState({})
			})
		}, [])

		const $state = Object.assign({}, store?.state, actionRef.current) as T
		return getState($state) as SliceState
	}
}
