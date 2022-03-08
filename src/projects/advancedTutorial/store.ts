import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";


const dataSlice = createSlice({
	name: "data",
	initialState: {
		realData: [],
		fakeDataToShow: [],
	},
	reducers: {
		resetFakeData(state){
			state.fakeDataToShow = [...state.realData];

			return state;
		},
		setFakeData(state, actions: any){
			state.fakeDataToShow = actions.payload.data;   
			console.log(actions);
			return state;
		},
		setRealData(state){
			state.realData = [...state.fakeDataToShow];

			return state;
		}
	}
});

const { resetFakeData, setFakeData, setRealData } = dataSlice.actions;


const apiSlice = createSlice({
	name: "api",
	initialState: {
		get: "https://pokeapi.co/api/v2/pokemon?limit=10",
		post: "https://pokeapi.co/api/v2/pokemon",
	},
	reducers: {

	},
});


const rootSlices = combineReducers({
	data: dataSlice.reducer,
	api: apiSlice.reducer
});

export const store = configureStore({
	reducer: rootSlices
});

export const actions = {
	resetFakeData, 
	setFakeData, 
	setRealData,
};

