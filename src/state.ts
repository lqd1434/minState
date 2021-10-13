import {Action, State, useInjection} from "./minState/descStore"


class Person {
	@State(1)
	id: number | undefined

	@Action()
	setId(value:number){
		this.id = value
	}

	@Action()
	clear(){
		this.id = 0
	}
}

class Music{

	@State<string>('')
	MusicName:string|undefined

	@Action()
	setName(value:string){
		this.MusicName = value
	}
}

export const usePerson =()=>{
	return useInjection<Person>(Person)
}

export const useMusic =()=>{
	return useInjection<Music>(Music)
}
