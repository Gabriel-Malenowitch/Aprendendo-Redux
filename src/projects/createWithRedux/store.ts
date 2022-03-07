import { createStore } from "redux";
import { listAlphabeticGenerator } from "../data-generator";



const broosList = [
	{id: 0 , word: "flavin do pneu",},
	{id: 1 , word: "antônio natações",},
	{id: 2 , word: "Cláudio caminhoneiro",},
	{id: 3 , word: "Jão, padeiro"},
];

const INITIAL_STATE = {
	dataList: [...broosList],
	showFakeListData: [...broosList],
	lastOperation: null
};


const reducer = (state: any = INITIAL_STATE, actions: any) => {
	

	switch(actions.type){

	case "loadStore":
		resetShowList();
		break;

	case "create":
		state.showFakeListData.push({
			id: state.showFakeListData.length-1, 
			word: actions.word
		});

		fetch("blablabla",{
			method: "POST",
			headers: new Headers(),
			body: JSON.stringify({
				id: state.showFakeListData.length-1, 
				word: actions.word
			})
		})
			.then(e=>e.json())
			.then(json=>{
				lastOperation("successLastOperation");
				successShowList(json);
			})
			.catch(err=>{
				lastOperation("failLastOperation");
				resetShowList();
			});
		break;
	case "resetLastOperation":
		state.lastOperation = null;
		break;
	case "successLastOperation":
		state.lastOperation = true;
		break;
	case "failLastOperation":
		state.lastOperation = false;
		break;
	case "resetShowList":
		state.showFakeListData = [...state.dataList];
		break;
	case "setShowList":
		state.dataList = actions.data;
		state.showFakeListData = [...state.dataList];
		break;
	}

	return state;
};

export const store = createStore(reducer);


function lastOperation(type: string){
	store.dispatch({ type });
}
function resetShowList(){
	store.dispatch({ type: "resetShowList" });
}
function successShowList(data: any){
	store.dispatch({ type: "setShowList", data });
}