import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { ChangeEvent, useState, useEffect } from "react";
import { mainApi, store, myApi } from "./api";
import { CardData } from "./types";
import { Provider } from "react-redux";
import { createSlice } from "@reduxjs/toolkit";

const {
	useGetCardsQuery,
	useCreateCardMutation,
	useDeleteCardMutation,
	useUpdateCardMutation,
} = myApi;


const cardJsonDefault = {
	createdAt: new Date().toString(),
	updatedAt: null,
	status: "requested",
	id: null,
	user_id: 0,
	metadatas: {
		name: "Novo usuárioa laaaaaa",
		digits: 9,
		limit: 2 ,
	}
};

function ListView(){
	const { data, isLoading, isFetching, refetch } = useGetCardsQuery();
	const [ updateCard ] = useUpdateCardMutation();
	const [ createCard ] = useCreateCardMutation();
	const [ deleteCard ] = useDeleteCardMutation();

	console.log(useGetCardsQuery());

	if( isLoading || isFetching ) return <>Loading...</>;

	return(
		<>
			<button onClick={()=>{
				createCard(cardJsonDefault);
			}}>Criar mais um</button>
			
			<ul>
				{data?.map((card: CardData | any)=>{
					return(
						<li key={card.id}>

							<input type="text" id={`Card-${card.id}`}/>
							
							<button onClick={async ()=>{
								const value = (document.getElementById(`Card-${card.id}`) as HTMLInputElement).value as string;
								await updateCard({
									data: {...card, metadatas: {...card.metadatas, name: value}},
									id: card.id
								});
								refetch();
							}}>edit</button>

							<button onClick={async ()=>{
								await deleteCard(card.id);
								refetch();
							}}>Deletar usuário</button>

							<span>{card.metadatas.name}</span>
							
						</li>
					);
				})}
			</ul>
		</>
	);
}





export function Bahh(){
	return (
		// <ApiProvider api={mainApi}>
		<Provider store={store}>
			<ListView/>
		</Provider>
		// </ApiProvider>
	);
}
