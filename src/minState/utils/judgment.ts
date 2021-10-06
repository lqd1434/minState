export enum TypeEnums{
	Num = 'number',
	Str = 'string',
	Func = 'function',
	Sym = 'symbol',
	Uni = 'undefined',
	Obj = 'Object',
	Arr = 'Array',
	Mul = 'Null',
}

export function JudgmentType(targetType:any) {
	if (!(typeof targetType === 'object')) return (typeof targetType) as string
	let type:string = ''
	const typeString = Object.prototype.toString.call(targetType)

	switch (typeString) {
		case '[object Object]':
			type = 'Object';break
		case '[object Array]':
			type = 'Array';break
		case '[object Null]':
			type = 'Null';break
	}
	return type
}
