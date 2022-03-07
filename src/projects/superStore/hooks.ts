import { useContext } from "react";
import { Context } from "./";

export function useReload(){
	const [ reload ] = useContext(Context);
	return reload;
}
