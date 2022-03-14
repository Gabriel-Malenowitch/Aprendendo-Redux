import { configureStore, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Provider } from "react-redux";
import { CardData, UpdateCardData } from "./types";


const url = "https://nucleo-admin-gabriel-maleno.herokuapp.com/api/";

export const mainApi = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: url
	}),
	endpoints: (builder) => ({
		getCards: builder.query<CardData[], void>({
			query: () => "/cards"
		}),
		updateCard: builder.mutation<CardData, UpdateCardData>({
			query: ({data, id}: UpdateCardData) => {
				return({
					method: "PUT",
					url: `/cards/${id}`,
					body: data
				});
			}
		}),
		createCard: builder.mutation<CardData[], CardData>({
			query: (data: CardData) => {
				return ({
					method: "POST",
					url: "/cards",
					body: data
				});
			}
		}),
		deleteCard: builder.mutation<CardData, number>({
			query: (id: number) => {
				return ({
					method: "DELETE",
					url: `/cards/${id}`,
					body: {}
				});
			}
		})
	})
});

export const myApi = createApi({
	reducerPath: "myApiName",
	baseQuery: fetchBaseQuery({ baseUrl: url}),
	endpoints: (builder) => ({
		getCards: builder.query<CardData[], void>({
			query: () => "/cards",
		}),
		createCard: builder.mutation<CardData[], CardData>({
			query: (data: CardData) => ({
				method: "POST",
				url: "/cards",
				body: data
			})
		}),
		updateCard: builder.mutation<CardData, UpdateCardData>({
			query: ({data, id}: UpdateCardData) => ({
				method: "PUT",
				url: `/cards/${id}`,
				body: data
			})
		}),
		deleteCard: builder.mutation<CardData, number>({
			query: (id: number) => ({
				method: "DELETE",
				url: `/cards/${id}`,
				body: {}
			}),
		})
	})
});

const slice = createSlice({
	name: "example",
	initialState: [],
	reducers: {}

});

export const store = configureStore({
	reducer: {
		[slice.name]: slice.reducer ,
		[myApi.reducerPath]: myApi.reducer
	},
	middleware: (getDefaultMiddleware: () => any) => (
		getDefaultMiddleware().concat(myApi.middleware)
	)
});


function Nas(){
	
	return(
		<Provider store={store}>
			<div>Hellom world</div>
		</Provider>
	);
	
}

