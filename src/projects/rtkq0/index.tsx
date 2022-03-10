
// iGNORAR QUALQUER TIPO DE CRIME NESTE CÓDIGO,
// UTILIZADO PARA TESTES E <MALUQUICES>oBRIGADO</MALUQUICES>

// iGNORAR QUALQUER TIPO DE CRIME NESTE CÓDIGO,
// UTILIZADO PARA TESTES E <MALUQUICES>oBRIGADO</MALUQUICES>

// iGNORAR QUALQUER TIPO DE CRIME NESTE CÓDIGO,
// UTILIZADO PARA TESTES E <MALUQUICES>oBRIGADO</MALUQUICES>

// iGNORAR QUALQUER TIPO DE CRIME NESTE CÓDIGO,
// UTILIZADO PARA TESTES E <MALUQUICES>oBRIGADO</MALUQUICES>


import { configureStore, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ChangeEvent, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Form, Field } from "react-final-form";


// const url = "https://jsonplaceholder.typicode.com/";
const url = "https://nucleo-admin-gabriel-maleno.herokuapp.com/api/";


const simpleApi = createApi({
	reducerPath: "usersApi",
	baseQuery: fetchBaseQuery({
		baseUrl: url,
	}),
	endpoints: (builder) => ({
		users: builder.query<any, void>({
			query: () => "/users",
			
		}),
		user: builder.query<any, number>({
			query: (id: number) => `/users/${id}`
		}),
		createCard: builder.mutation<any, any>({
			query: (user: any) => {
				// console.log(user);

				return ({
					method: "POST",
					url: "/cards",
					// headers: {"Content-Type": "application/json"},
					body: user,
				});
			},
			
		}),
		cards: builder.query<any, void>({
			query: () => "/cards",
		})
		
	}),
	

});

const { 
	useUsersQuery, 
	useUserQuery, 
	useCreateCardMutation,
	useCardsQuery,
} = simpleApi;
console.log(simpleApi);

export const store = configureStore({
	reducer: {
		[simpleApi.reducerPath]: simpleApi.reducer,
	},
	middleware: (getDefault) => getDefault().concat(simpleApi.middleware)
});

export function Rtkq0(){

	return(
		<Provider store={store}>
			<App/>
		</Provider>
	);
}

function App(){
	const [ value, setValue ] = useState(0);

	const { data, error, isLoading, isFetching, refetch } = useUsersQuery();
	const { 
		data: userData, 
		currentData: currentUserData, 
		isLoading: userLoading, 
		isFetching: userFetching,
	} = useUserQuery(value, {
		refetchOnFocus: true,
	});
	
	const [
		createUser, 
		result
	] = useCreateCardMutation();
	
	const {
		data: cards, refetch: refetch2,
		isFetching: isFetchingCards,
		isLoading: isLoadingCards,
	} = useCardsQuery();

	console.log(cards);


	if(isLoading || isLoadingCards) return <>Loading...</>;
	if(isFetching || isFetchingCards) return <>Fetching...</>;
	if(error) return <>Error...</>;

	return(
		<>
			<input type="number" onChange={(e: any)=>setValue(Number(e.target.value))} />

			{userLoading && <span>Loading...</span>}
			{userFetching && <span>Fetching...</span>}
			{userData && <div>Nome: {userData.name}</div>}
			{!userData && <div>currentData: {currentUserData?.name}</div>}

			<button onClick={()=>refetch()}>Refetch bottom list</button>

			<ul>
				{data?.map((p: any)=>(<li key={p.id}>{p.name}</li>))}
			</ul>

			<Form 
				onSubmit={(values: any)=>{
					const base = {"createdAt":"2016-03-18T21:07:41.731Z","updatedAt":null,"status":"requested","id": 1,"user_id":1,"metadatas":{"name":"Tiago Rodrigues","digits":7988,"limit":7765}};
					// base.metadatas.name = values.userName;
					const n = {metadatas: { name: values.userName}};
					// console.log(n);
					createUser(n);	
					// refetch2();
					result.reset();
					
				}}

				
				render={({handleSubmit, form}: any)=>(
					<form onSubmit={handleSubmit}>
						<Field name="userName">
							{({input})=>(
								<input {...input} type="text" placeholder="UserName"/>
							)}
						</Field>
						<button type="submit" >Enviar</button>
					</form>
				)}
			/>

			<ul>
				{cards?.filter((user: any)=>user.metadatas?.name).map((user: any)=><li key={user.id}>{user.metadatas?.name}</li>)}
			</ul>
			
		</>
	);
}


