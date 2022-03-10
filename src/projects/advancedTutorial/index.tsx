import { ChangeEvent, useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store, actions } from "./store";


export function Ape(){
	return (
		<Provider store={store}>
			<CardsList/>
		</Provider>
	);
}



type apiT = {
    get: string,
    post: string,
}

type itemT = {
    url: string,
    name: string,
}

type dataT = {
    realData: itemT[],
    fakeDataToShow: itemT[],
}

type sT = {
    api: apiT,
	data: dataT,
}

function CardsList(){
	const dispatch = useDispatch();
	const state = useSelector((d:sT)=>d);
	const [ value, setValue ] = useState("");

	useEffect(()=>{
		(()=>{
			fetch(state.api.get).then(p=>p.json())
				.then((json: any)=>{
					dispatch(actions.setFakeData({data: json.results}));        
					dispatch(actions.setRealData());        

				})
				.catch((err: Error)=>{
					dispatch(actions.resetFakeData());
					alert("Tivemos um problema por aqui...");
				});
		})();
	}, []);

	const thunk = (thisData: itemT) => {
		dispatch(actions.setFakeData({
			data: [
				...state.data.fakeDataToShow,
				{url: "", name: value}
			]
		}));        
		fetch(state.api.post,{
			method: "POST",
			headers: new Headers(),
			body: JSON.stringify(thisData)
		}).then(p=>p.json())
			.then((json: any)=>{
				dispatch(actions.setRealData());
				setValue("");
			})
			.catch((err: Error)=>{
				dispatch(actions.resetFakeData());
				setValue("");
				alert("Tivemos um problema por aqui...");
			});
	};

	const submit = () => dispatch(thunk({url: "", name: value}));
	console.log(state.data);

	return(
		<>
			<ul>
				{state.data.fakeDataToShow.map((item: itemT, id: number)=>{
					return(
						<li key={id}>{item.name}</li>
					);
				})}
			</ul>
			<input type="text" value={value} onChange={(e: ChangeEvent<HTMLInputElement>)=>setValue(e.target.value)} />
			<button onClick={submit}>Tente fzr o post hehe</button>
		</>
	);
}
