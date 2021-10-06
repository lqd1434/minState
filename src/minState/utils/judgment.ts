export interface TypeRes{
	number
	function
 	string
	symbol
	undefined
	Object
	Array
	Null
}

export function JudgmentType(targetType:any) {
	if (!(typeof targetType === 'object')) return (typeof targetType) as string
	let type:string = ''
	const tempType = Object.prototype.toString.call(targetType)
	switch (tempType) {
		case '[object Object]':
			type = 'Object';break
		case '[object Array]':
			type = 'Array';break
		case '[object Null]':
			type = 'Null';break
	}
	return type
}
