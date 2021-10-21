import 'reflect-metadata'
//
// function Type(type) {
// 	return Reflect.metadata('design:type', type)
// }
// function ParamTypes(...types) {
// 	return Reflect.metadata('design:paramtypes', types)
// }
// function ReturnType(type) {
// 	return Reflect.metadata('design:returntype', type)
// }
//
// // Decorator application
// @ParamTypes(String, Number)
// class C {
// 	constructor(text, i) {}
//
// 	@Type(Number)
// 	age: number = 18
//
// 	@Type(String)
// 	get name() {
// 		return 'text'
// 	}
//
// 	@Type(Function)
// 	@ParamTypes(Number, Number)
// 	@ReturnType(Number)
// 	add(x, y) {
// 		return x + y
// 	}
// }
//
// // Metadata introspection
// let obj = new C('a', 1)
// console.log(obj)
// let paramTypes = Reflect.getMetadata('design:type', obj, 'age')
// console.log(paramTypes)

class InjectorCon {
	private readonly providerMap: Map<any, any> = new Map()
	private readonly instanceMap: Map<any, any> = new Map()

	public setProvider(key: any, value: any) {
		if (!this.providerMap.has(key)) {
			this.providerMap.set(key, value)
		}
	}

	public getProvider(key: any) {
		return this.providerMap.get(key)
	}

	public setInstance(key: any, value: any) {
		if (!this.instanceMap.has(key)) {
			this.instanceMap.set(key, value)
		}
	}

	public getInstance(key: any) {
		if (!this.instanceMap.has(key)) {
			return this.instanceMap.get(key)
		}
		return null
	}

	public setValue(key: any, value: any): void {
		if (!this.instanceMap.has(key)) {
			this.instanceMap.set(key, value)
		}
	}
}

export const injectorCon = new InjectorCon()

export function Injectable() {
	return (constructor: any) => {
		injectorCon.setProvider(constructor, constructor)
		console.log('9')
	}
}

export function Inject() {
	return function (target: any, propertyName: string) {
		const constructor = target.constructor
		const inst = new constructor()
		console.log(inst, propertyName)
		let providerInstance = injectorCon.getInstance(constructor)
		console.log(providerInstance, 'providerInstance')
		if (!providerInstance) {
			const ProviderClass = injectorCon.getProvider(constructor)
			console.log(ProviderClass, 'ProviderClass')
			providerInstance = new ProviderClass()
			injectorCon.setInstance(constructor, providerInstance)
		}
		constructor[propertyName] = providerInstance
	}
}

@Injectable()
class Cloth {
	name: string = '麻布'
}

@Injectable()
class Clothes {
	@Inject()
	cloth: Cloth

	clotheName: string

	constructor() {
		this.cloth = this.cloth
		this.clotheName = this.clotheName
	}

	updateName(name: string) {
		this.clotheName = name
	}
}

class Humanity {
	@Inject()
	clothes: Clothes

	name: string

	constructor(name: string) {
		this.clothes = this.clothes
		this.name = this.name
	}

	update(name: string) {
		this.clothes.updateName(name)
	}
}

const jack = new Humanity('jack')
console.log(jack)
