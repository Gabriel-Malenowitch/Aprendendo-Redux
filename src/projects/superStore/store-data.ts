import { listAlphabeticGenerator } from "../data-generator";
import { createStore } from "redux";



let list = listAlphabeticGenerator(50);
list = list.map(item=>({...item, inCart: false}));

const INITIAL_STATE = {
	storeItems: list,
	cartItems: []
};

export const store = createStore((state: any = INITIAL_STATE, actions: any)=>{

	switch(actions.type){
	case "addCart":
		actions.item.inCart = true;
		state.cartItems.push(actions.item);
		break;
	case "removeCart":
		actions.item.inCart = false;
		state.cartItems.splice(actions.index, 1);
		break;
	}

	return state;
});

