import { useState, useEffect, Dispatch} from "react";

const isFunction = (fn: any) => typeof fn === 'function';
const isString = (str: any) => typeof str === 'string';

const defaultReducer = (state: any, payload: any) => payload;

interface StoresType {
	name: string
	store: Store
}

interface SubscribersType {
	name: string
	store: Store
}

// define global store
let $$stores: any = {};
const $$subscribers: any = {};

/**
 * the class to implements store
 *
 * @class Store
 */
class Store {
	name: string
	state: any
	reducer: any
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

	dispatch(action: any, callback: (data: any) => void) {
		const {name, state} = this;
		this.state = this.reducer(state, action);
		this.dispatchers.forEach((dispatcher: (arg0: any) => any) => {
			console.log(dispatcher)
			dispatcher(this.state)
		});
		if ($$subscribers[name].length) {
			$$subscribers[name].forEach((c: (arg0: any, arg1: any) => any) => c(state, action));
		}
		if (typeof callback === 'function') callback(state)
	}
}

/**
 * get store instance by input identifier
 * @param {*} identifier
 * @returns {Store}
 */
function getStoreItem(identifier: any) {
	const name = identifier instanceof Store ? identifier.name : identifier;
	if (!$$stores[name]) {
		return null
	}
	return $$stores[name];
}

export function createStore(name: string, state = {}, reducer?: ((state: any, payload: any) => any) | undefined) {
	if (!isString(name)) {
		throw new Error('Store name must be a string');
	}
	if ($$stores[name]) {
		throw new Error(`Store with name ${name} already exists`);
	}

	$$subscribers[name] = [];
	const store = new Store(name, state, reducer);

	$$stores = Object.assign({}, $$stores, {[name]: store});
	// console.log($$stores)
	return store;
}

/**
 * Can only be called within React Components
 * @param {String|Store} identifier - The identifier for the find store
 * @returns {Array} the [state, setState] pair.
 */
export function useStore<T>(identifier: any) {
	let store = getStoreItem(identifier);
	if (!store){
		store = createStore(identifier,0)
	}
	const [state, set] = useState(store.state);

	useEffect(() => {
		if (!store.dispatchers.includes(set)) {
			store.dispatchers.push(set);
		}
		//组件卸载时取消监听
		return () => {
			store.dispatchers = store.dispatchers.filter((setter: Dispatch<any>) => setter !== set)
		}
	}, [])

	return [ state, store.dispatch ];
}

interface CreateProps {
	identifier: string
}

export const create = (identifier: string,initState:any)=>{
	let store = getStoreItem(identifier);
	if (!store){
		store = createStore(identifier,initState)
	}

	const [state, set] = useState(store.state);

	useEffect(() => {
		if (!store.dispatchers.includes(set)) {
			store.dispatchers.push(set);
		}
		//组件卸载时取消监听
		return () => {
			store.dispatchers = store.dispatchers.filter((setter: Dispatch<any>) => setter !== set)
		}
	}, [])

	return [ state, store.dispatch ];
}
