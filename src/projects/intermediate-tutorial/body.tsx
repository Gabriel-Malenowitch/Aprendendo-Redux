import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "./store";



export function Body(){
	const [ value, setValue ] = useState("");
	const dispatch = useDispatch();
	const data = useSelector((d: string[] | never[])=>d);

	const onChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);
	const submit = () => {
		console.log(addTodo({newItem: value}));
		dispatch(addTodo({
			newItem: value
		}));
	};

	return (
		<>
			<ul>
				{data?.map((item: string, id: number)=>(
					<li key={id}>{item}</li>
				))}
			</ul>
			<input onChange={onChange} value={value} type="text" />
			<button onClick={submit}>Adicionar</button>
		</>
	);
}

