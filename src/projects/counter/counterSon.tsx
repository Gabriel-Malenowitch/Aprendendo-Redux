import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "./actions";


type dataType = {
    screw: number
}

export function CounterSon(){
	const [ s, rtS ] = useState(true); const reload = () => rtS(!s);
	const dispatch = useDispatch();
	const screw = useSelector((data: dataType)=>data);

	return (
		<ul>
			<li>{screw}</li>
			<li><button onClick={()=>{dispatch(actions.increment()); reload();}} >Incrementar</button></li>
			<li><button onClick={()=>{dispatch(actions.decrement()); reload();}} >Decrementar</button></li>
		</ul>
	);
}