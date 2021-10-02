import { useState, useEffect, Dispatch} from "react";

const isFunction = (fn: any) => typeof fn === 'function';
const isString = (str: any) => typeof str === 'string';

interface CreateType<T> {
	name:string
	value:T
	reducer?:(state: T, payload: T) => T;
}

const defaultReducer:CreateType<any>["reducer"] = (state: any, payload: any) => payload;


export interface DispatchType<T> {
	newValue: T
	callback?: (value:T)=>void
}

// define global store
let $$stores: any = {};
const $$subscribers: any = {};

/**
 * the class to implements store
 *
 * @class Store
 */
class Store<T extends any> {
	name: string
	state: T
	reducer?: any
	dispatchers: any

	constructor(name: string, state: any, reducer = defaultReducer) {
		this.name = name;
		this.state = state;
		this.reducer = reducer;
		this.dispatchers = [];
		this.dispatch = this.dispatch.bind(this)
	}

	subscribe(callback: any) {
		if (!isFunction(callback)) {
			throw new Error(
					`the function named subscribe callback argument must be a function.`
			);
		}
		const {name} = this
		if ($$subscribers[name].includes(callback)) {
			console.warn('This callback is already subscribed to this store.');
			return;
		}
		$$subscribers[name].push(callback);
		return () => {
			$$subscribers[name] = $$subscribers[name].filter((item: any) => item !== callback)
		}
	}


	dispatch({newValue,callback}:DispatchType<T>) {
		const {name, state} = this;
		this.state = this.reducer(state, newValue);
		this.dispatchers.forEach((dispatcher: (arg0: any) => any) => {
			dispatcher(this.state)
		});
		if ($$subscribers[name].length) {
			$$subscribers[name].forEach((c: (arg0: any, arg1: any) => any) => c(state, newValue));
		}
		if (callback&&typeof callback === 'function'){
			 callback(state)
		}
	}
}

/**
 * get store instance by input identifier
 * @param {*} identifier
 * @returns {Store}
 */
function getStoreItem(identifier: string) {
	const name = identifier;
	if (!$$stores[name]) {
		return null
	}
	return $$stores[name];
}

function create<T>({name,value,reducer}:CreateType<T>) {
	if ($$stores[name]) {
		return
	}

	$$subscribers[name] = [];
	const store = new Store<T>(name, value, reducer);

	$$stores = Object.assign({}, $$stores, {[name]: store});
	// console.log($$stores)
	return store;
}


export function createStore<T>({name,value}:Omit<CreateType<T>, "reducer" >):[T,(data:DispatchType<T>)=>void]{
	let store = getStoreItem(name);
	if (!store){
		store = create<T>({name,value})
	}
	const [state, setState] = useState(store.state);

	useEffect(() => {
		if (!store.dispatchers.includes(setState)) {
			store.dispatchers.push(setState);
		}
		//组件卸载时取消监听
		return () => {
			store.dispatchers = store.dispatchers.filter((setter: Dispatch<any>) => setter !== setState)
		}
	}, [])

	return [ state, store.dispatch ];
}

