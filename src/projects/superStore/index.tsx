import Store from "./Store";
import Cart from "./Cart";
import { Provider } from "react-redux";
import { store } from "./store-data";
import { styler } from "./style";
import { createContext, useState } from "react";


export const Context = createContext<any | null>(null);

export function SuperStore(){
	const [ screw, rotateScrew ] = useState(false);
	const reload = () => rotateScrew(!screw);

	return (
		<Context.Provider value={[ reload ]}>
			
			<Provider store={store} >
				<div style={styler.container}>
					<Store/>
					<Cart/>
				</div>
			</Provider>
			
		</Context.Provider>
	);
}

