import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { ChangeEvent, useState, useEffect } from "react";
import { store, myApi } from "./api";
import { Provider, useSelector } from "react-redux";
import { createSlice  } from "@reduxjs/toolkit";

const {
	useGetPokemonsQuery,
} = myApi;


const styler = {
	container: {
		display: "flex",
		padding: 10
	},

	headers: {
		border: "solid 2px black",
		borderRadius: 5,
		minHeight: 100,
		backgroundColor: "#DDD",
		padding: 10	
	},

	containers: {
		border: "solid 2px black",
		borderRadius: 5,
		minHeight: 200,
		backgroundColor: "#DDD",
		padding: 10
	},

	containerers: {
		width: "100%",
		padding: 10
	}
};

function Users(){
	const state = useSelector((data: any)=>data);
	
	const [ one, setOne ] = useState(0);
	const [ toggleOne, setToggleOne ] = useState(false);

	const [ two, setTwo ] = useState(0);
	const [ toggleTwo, setToggleTwo ] = useState(false);
	
	useGetPokemonsQuery(one, { skip: toggleOne });
	useGetPokemonsQuery(two, { skip: toggleTwo });

	console.log(state.myApiName);

	const firstData = state.myApiName.subscriptions;
	const secondData = state.myApiName.queries;
	const mode = (component: true | false) => component ? "to active" : "to inative"; 

	return (
		<div style={styler.container}>
			<div style={styler.containerers}>
				<div style={styler.headers}>
					
					<div>
						Primeiro:
						<button onClick={()=>setOne(one-1)}>-</button>
						<button onClick={()=>setOne(one+1)}>+</button>
						<button onClick={()=>setToggleOne(!toggleOne)}>toggle {mode(toggleOne)}</button>
						<br />
						<br />
						Segundo: 
						<button onClick={()=>setTwo(two-1)}>-</button>
						<button onClick={()=>setTwo(two+1)}>+</button>
						<button onClick={()=>setToggleTwo(!toggleTwo)}>toggle {mode(toggleTwo)}</button>
					</div>
				</div>

				<div style={styler.containers}>
					<h2>Caches existentes:</h2>
					<pre>{JSON.stringify(firstData, null, 2)}</pre>			
				</div>				
			</div>



			<div style={styler.containerers}>
				<div style={styler.headers}>
					
					<div>
						
					</div>
				</div>

				<div style={styler.containers}>
					<h2>Caches existentes, com dados:</h2>
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
