import { createContext, useState } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { BroosList } from "./broosList";


export const ContextCreateWithRedux = createContext<any | null>(null);

export function ListBrothers(){
	const [ screw, rotateScrew] = useState(false);
	const reload = () => rotateScrew(!screw);

	return (
		<ContextCreateWithRedux.Provider value={[ reload ]}>
			<Provider store={store}>
				<BroosList/>	
			</Provider>
		</ContextCreateWithRedux.Provider>
	);
}