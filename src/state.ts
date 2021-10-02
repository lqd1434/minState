import {create} from "./minState";

export const useMyState = () =>{
	return (create('count',0))
}
