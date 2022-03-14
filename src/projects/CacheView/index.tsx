import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { ChangeEvent, useState, useEffect } from "react";
import { store, myApi } from "./api";
import { Provider, useSelector } from "react-redux";
import { createSlice  } from "@reduxjs/toolkit";

const {
	useGetPokemonsQuery,
} = myApi;


function Users(){
	const styler = {
		container: {
			display: "flex",
		},

		headers: {
			border: "solid 2px black",
			borderRadius: 5,
			minHeight: 100,
			backgroundColor: "#DDD",
		},

		containers: {
			border: "solid 2px black",
			borderRadius: 5,
			minHeight: 200,
			backgroundColor: "#DDD"
		},

		containerers: {
			width: "100%",
		}
	};

	const state = useSelector((data: any)=>data);
	
	const [ one, setOne ] = useState(0);
	const [ toggleOne, setToggleOne ] = useState(false);

	const [ two, setTwo ] = useState(0);
	const [ toggleTwo, setToggleTwo ] = useState(false);
	
	const nobodyYesDoor0 = useGetPokemonsQuery(one, {
		skip: toggleOne,
	});
	const nobodyYesDoor1 = useGetPokemonsQuery(two, {
		skip: toggleTwo,
	});

	console.log(state.myApiName);

	const firstData = state.myApiName.subscriptions;
	const secondData = state.myApiName.queries;
	const mode = (component: true | false) => component ? "to active" : "to inative"; 

	return (
		<div style={styler.container}>
			<div style={styler.containerers}>
				<div style={styler.headers}>
					<button onClick={()=>setToggleOne(!toggleOne)}>toggle {mode(toggleOne)}</button>
					<div>
						<button onClick={()=>setOne(one-1)}>-</button>
						<button onClick={()=>setOne(one+1)}>+</button>
					</div>
				</div>

				<div style={styler.containers}>
					<pre>{JSON.stringify(firstData, null, 2)}</pre>			
				</div>				
			</div>



			<div style={styler.containerers}>
				<div style={styler.headers}>
					<button onClick={()=>setToggleTwo(!toggleTwo)}>toggle {mode(toggleTwo)}</button>
					<div>
						<button onClick={()=>setTwo(two-1)}>-</button>
						<button onClick={()=>setTwo(two+1)}>+</button>
					</div>
				</div>

				<div style={styler.containers}>
					<pre>{JSON.stringify(secondData, null, 2)}</pre>
				</div>
			</div>
		</div>
	);
}


export function CacheView(){
	return (
		<Provider store={store}>
			<Users/>
		</Provider>
	);
}
