import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
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