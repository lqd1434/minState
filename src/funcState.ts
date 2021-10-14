import {create} from "./minState/funcStore";

export const usePerson = function (){
	return create({
		name:'jack',
		age:18,
		setName:function (state: any,name:string) {
			console.log(state,'---action')
			return 'hello'
		}
	})
}
