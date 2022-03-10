import { createStore } from "redux";
import { ReactElement, createContext, useContext, useEffect, useState } from "react";


const Context = createContext<any | null>(null);

const INITIAL_STATE = {
	activeTab: 0,
	childrenComponent: <div></div>,
	reducer: [],
};

function redx(state: any = INITIAL_STATE, action: any){

	switch(action.type){
	case "changeTab":
		state.activeTab = action.tabNumber;
		state.childrenComponent = action.comp;
		break;
	case "createTab":
		state.reducer.push({
			id: action.tabNumber,
			label: action.tabName,
			comp: action.comp
		});
		state.activeTab = action.tabNumber;
		state.childrenComponent = action.comp;
		break;
	}
	
	return state;
}

const store = createStore(redx);
export function TabbedLayout(){
	const [ rer, setRer ] = useState(false);
	const child = store.getState().childrenComponent;

	const r = () => setRer(!rer);

	return (
		<Context.Provider value={{ r }}>
			<div>
				<Tab label="Cleiton">
					<div style={{
						width: 400,
						height: 200,
						backgroundColor: "#1b7aa7"
					}}>
						<span>AAAAAAAAAAAAAAAAAAA</span>
					</div>
				</Tab>

				<Tab label="Pipoca">
					<div style={{
						width: 400,
						height: 200,
						backgroundColor: "#de9beb"
					}}>
						<span>Seu zé tocava violão de ponta cabeça numa rede laranja perto do campo minado do windows xp</span>	
					</div>
				</Tab>

				<Tab label="Patrícia Abravanel">
					<div style={{
						width: 400,
						height: 200,
						backgroundColor: "#a7241b"
					}}>
						<span>aba errada cupade</span>	
					</div>
				</Tab>
			</div>
			{child}
		</Context.Provider>
	);
}



type TabProps = {
    label: string,
	children: ReactElement,
}
type chanProps = {
	type: string, 
	tabNumber: number | null
}
function Tab({ children, label }: TabProps){
	const { r } = useContext(Context);
	const [ id, setId ] = useState(0);

	useEffect(()=>{
		setId(store.getState().reducer.length);
		store.dispatch({
			type: "createTab", 
			tabNumber: id, 
			tabName: label,
			comp: children
		});
		store.dispatch({
			type: "changeTab", 
			tabNumber: id, 
			comp: store.getState().reducer[0].comp
		});
		r();
	}, []);

	const changeTab = () => {
		store.dispatch({
			type: "changeTab", 
			tabNumber: id, 
			comp: children 
		});
		r();
	};
	return (
		<>
			<button style={{backgroundColor: store.getState().activeTab === id ? "#b79" : "#ddd"}} onClick={changeTab}>{label}</button>
		</>
	);
}



