function makePropertyMapper<T>(prototype: any, key: string, mapper: (value: any) => T) {
	const values = new Map<any, T>();
	console.log(prototype[key],key)
	Object.defineProperty(prototype, key, {
		set(firstValue: any) {
			console.log('-----firstValue',firstValue)
			Object.defineProperty(this, key, {
				get() {
					return values.get(this);
				},
				set(value: any) {
					values.set(this, mapper(value));
				},
				enumerable: true,
			});
			this[key] = firstValue;
		},
		enumerable: true,
		configurable: true,
	});
}

function exampleDecorator(multiplier: number) {
	return function(target: any, key: string) {
		makePropertyMapper(target, key, (value: number) => {
			return value * multiplier;
		});
	};
}

class Example {
	@exampleDecorator(3)
	myNumber: number | undefined = 5;

	@exampleDecorator(3)
	withInitializer = 2;
}

export const example = new Example();
console.log(example.myNumber); // undefined
console.log(Object.keys(example))
console.log(example.withInitializer); // 6
console.log(Object.keys(example).includes("withInitializer")); // true

example.myNumber = 3;
console.log(example.myNumber); // 9
console.log(Object.keys(example).includes("myNumber")); // true
