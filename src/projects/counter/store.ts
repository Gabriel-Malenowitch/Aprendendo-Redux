import { configureStore, createAction, createReducer, createSlice } from "@reduxjs/toolkit";


const INITIAL_STATE = {
	screw: 0
};
type InitialStateType = {
    screw: number,
}


// const increment = createAction("INCREMENT");
// const decrement = createAction("DECREMENT");


// const reducer = (state: any = INITIAL_STATE, action: any) => {
    
// 	switch(action.type){
// 	case increment.type:
// 		state.screw += 1;
// 		break;
// 	case decrement.type:
// 		state.screw -= 1;
// 		break;
// 	}

// 	console.log(state);

// 	return state;
// };


// const counter = createReducer(INITIAL_STATE.screw, {
// 	[increment.type]: (state: number) => state += 1,
// 	[decrement.type]: (state: number) => state -= 1,
// });

const counterSlice = createSlice({
	name: "counter",
	initialState: 0,
	reducers: {
		increment: (state: number) => {
			state += 1;
			return state;
		},
		decrement: (state: number) => {
			state -= 1;
			return state;
		},
	}
});


export const store = configureStore({
	reducer: counterSlice.reducer,
    
});

const { actions, reducer } = counterSlice;
const { increment, decrement } = actions;


