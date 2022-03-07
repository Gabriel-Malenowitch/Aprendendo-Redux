import { useContext } from "react";
import { ContextCreateWithRedux } from "./index";

export function useReload(){
	const [ reload ] = useContext(ContextCreateWithRedux);
	return reload;
}