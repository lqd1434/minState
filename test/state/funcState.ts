import {create} from "../../src/minState/funcStore";

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

export const useMusic=create<Music>((set)=>{
	return {
		musicName:'hello world',
		singer:'jack',
		setMusicName: (musicName:string)=> {
			set({musicName:'喂不饱'})
		},
		setSinger:(singer:string)=>{
			set({singer:'bob'})
		}
	}
})

interface Person{
	name:string
	age:number
	setName:(name:string)=>void
	setAge:(age:number)=>void
}

interface Music{
	musicName:string
	singer:string
	setMusicName:(musicName:string)=>void
	setSinger:(singer:string)=>void
}
