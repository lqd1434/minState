import {create} from "./minState/funcStore";

export const usePerson =create<Person>((set)=>{
	return {
		name:'jack',
		age:10,
		setName: (name:string)=> {
			set({name:'hello'})
		},
		setAge:()=>{
			set({age:18})
		}
	}
})

interface Person{
	name:string
	age:number
	setName:(name:string)=>void
	setAge:(age:number)=>void
}
