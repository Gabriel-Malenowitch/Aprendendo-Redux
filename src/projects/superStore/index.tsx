import { createContext, useContext, useState} from "react";
import { createStore } from "redux";


const Context = createContext<null | any>(null);


const INITIAL_STATE = {
	cartItens: [],
	storeItens: []
};

const store = createStore((state: any, actions: any)=>{


	return state;
});

export function SuperStore(){
	return (
		<Context.Provider value={{}}>
			{/* <Store /> */}
			{/* <Cart/> */}
		</Context.Provider>
	);
}
