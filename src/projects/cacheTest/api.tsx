import { configureStore, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Provider } from "react-redux";
import { CardData, UpdateCardData } from "./types";


const url = "https://nucleo-admin-gabriel-maleno.herokuapp.com/api/";

export const myApi = createApi({
	reducerPath: "myApiName",
	baseQuery: fetchBaseQuery({ baseUrl: url}),
	tagTypes: ["Cards"],
	endpoints: (builder) => ({
		getCards: builder.query<CardData[], void | number>({
			query: () => "/cards",
			providesTags: ["Cards"],
			transformResponse: (data: CardData[]) => {
				const newData = data.map((user: CardData)=>({
					...user, 
					metadatas: {...user.metadatas, name: "-> "+user.metadatas.name}
				}));
				return newData;
			},
			keepUnusedDataFor: 2,
		}),
		createCard: builder.mutation<CardData[], CardData>({
			query: (data: CardData) => ({
				method: "POST",
				url: "/cards",
				body: data
			}),
			invalidatesTags: ["Cards"],
		}),
		updateCard: builder.mutation<CardData, UpdateCardData>({
			query: ({data, id}: UpdateCardData) => ({
				method: "PUT",
				url: `/cards/${id}`,
				body: data
			}),
			invalidatesTags: ["Cards"]
		}),
		deleteCard: builder.mutation<CardData, number>({
			query: (id: number) => ({
				method: "DELETE",
				url: `/cards/${id}`,
				body: {}
			}),
			invalidatesTags: ["Cards"]
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