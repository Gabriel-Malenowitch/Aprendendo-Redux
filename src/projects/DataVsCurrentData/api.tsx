import { configureStore } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const url = "https://pokeapi.co/api/v2/";

export const myApi = createApi({
	reducerPath: "myApiName",
	baseQuery: fetchBaseQuery({ baseUrl: url}),
	endpoints: (builder) => ({
		getPokemons: builder.query<any[], {id: number}>({
			query: ({ id }) => `/pokemon?limit=${id}`,
			transformResponse: (data: any) => {
				const newData = data.results.map((pokemontItem: any)=>(pokemontItem.name));
				return newData;
			},
			keepUnusedDataFor: 5,
		}),
		getSevenPokemons: builder.query<any[], {id: number}>({
			query: () => "/pokemon?limit=7",
			transformResponse: (data: any) => {
				const newData = data.results.map((pokemontItem: any)=>(pokemontItem.name));
				return newData;
			},
			keepUnusedDataFor: 5,
		}),
	})
});

export const store = configureStore({
	reducer: {
		[myApi.reducerPath]: myApi.reducer
	},
	middleware: (getDefaultMiddleware: () => any) => (
		getDefaultMiddleware().concat(myApi.middleware)
	)
});