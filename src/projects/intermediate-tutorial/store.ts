import { combineReducers } from "redux";
import { createSlice, configureStore } from "@reduxjs/toolkit";


type actionsType = {
    type: string,
    newItem: string,
    
}

// const todosReducer = (state: string[] | never[] = [], actions: actionsType) => {

// 	switch(actions.type){
// 	case "ADD_TODO":
// 		state = [...state, actions.newItem];
// 		break;
// 	}

// 	console.log(state);

// 	return state;
// };

// type actionType = {
//     payload
// }

const todoSlice = createSlice({
	name: "todos",
	initialState: [
		"comprar agua", 
		"sei la", 
		"comprar um unicornio"
	] as string[] | never[],
	reducers: {
		addTodo(state: string[] | never[], action: any){
			state = [...state, action.payload.newItem];
			console.log(state);
			// console.log(state);
			return state;
		},
	}
});

export const { addTodo } = todoSlice.actions;



export const configure = configureStore({
	reducer: todoSlice.reducer
});

export const store = combineReducers({
	todos: todoSlice.reducer,
});

const storeConfigure = configureStore({
	reducer: store
});

export const n = () =>{
	// console.log("Store=>", store);
	// console.log("Configure=>", configure);
	// console.log("Slice=>", todoSlice);
	// console.log("StoreConfigure=>", storeConfigure);
	// console.log("StoreConfigureState=>", storeConfigure.getState());

};