import {Action, State, useInjection} from "../../src/minState/descStore"


class Music{
	@State<string>('李易峰')
	musicName:string|undefined

	@State<string>('jack')
	singer:string|undefined

	@Action()
	setName(name:string){
		this.musicName = name
	}

	@Action()
	setSinger(name:string){
		this.singer = name
	}
}

export const useMusic = ()=>{
	return useInjection<Music>(Music)
}
