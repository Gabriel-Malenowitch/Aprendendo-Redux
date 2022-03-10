import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { ChangeEvent, useState, useEffect } from "react";
import { mainApi } from "./api";
import { CardData } from "./types";

const {
	useGetCardsQuery,
	useCreateCardMutation,
	useDeleteCardMutation,
	useUpdateCardMutation,
} = mainApi;

console.log(mainApi);

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
	useEffect(()=>{const i = 0;}, [data]);

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
							
							<button onClick={()=>{
								const value = (document.getElementById(`Card-${card.id}`) as HTMLInputElement).value as string;
								updateCard({
									data: {...card, metadatas: {...card.metadatas, name: value}},
									id: card.id
								});
								refetch();
							}}>edit</button>

							<button onClick={()=>deleteCard(card.id)}>Deletar usuário</button>

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
		<ApiProvider api={mainApi}>
			<ListView/>
		</ApiProvider>
	);
}