export interface StoreType {
	[key: string]: any
}

/**
 * 函数式写法
 */
export type GetStateType<T> = (state: T) => T
export type CreateStateType<T> = (set: (state: Partial<T>) => Partial<T>) => T

/**
 * 装饰器写法
 */

export interface EmitterProps {
	changeKeys: string[]
	stateObj: Object
}
