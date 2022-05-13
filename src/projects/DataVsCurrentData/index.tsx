import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { ChangeEvent, useState, useEffect } from "react";
import { store, myApi } from "./api";
import { Provider, useSelector } from "react-redux";
import { createSlice  } from "@reduxjs/toolkit";

const {
	useGetPokemonsQuery,
	useGetSevenPokemonsQuery
} = myApi;

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


function Users(){


	const [id, setID] = useState(3);
	
	const { data, currentData} = useGetPokemonsQuery({ id });
	const { data: dataSeven } = useGetSevenPokemonsQuery({ id });

	return (
		<div style={styler.container}>
			<div style={styler.containerers}>
				<div style={styler.headers}>
					<div>
						<h2>Data</h2>
						<button onClick={()=>setID(id-1)}>-</button>
						<button onClick={()=>setID(id+1)}>+</button>
						<button>{id}</button>
					</div>
				</div>

				<div style={styler.containers}>
					<pre>{JSON.stringify(data, null, 2)}</pre>			
				</div>				
			</div>



			<div style={styler.containerers}>
				<div style={styler.headers}>
					<h2>CurrentData</h2>
				</div>

				<div style={styler.containers}>
					<pre>{JSON.stringify(currentData, null, 2)}</pre>
				</div>
			</div>


			<div style={styler.containerers}>
				<div style={styler.headers}>
					<h2>SevenData</h2>
				</div>

				<div style={styler.containers}>
					<pre>{JSON.stringify(dataSeven, null, 2)}</pre>
				</div>
			</div>
		</div>
	);
}


export function DataVsCurrentData(){
	return (
		<Provider store={store}>
			<Users/>
		</Provider>
	);
}
