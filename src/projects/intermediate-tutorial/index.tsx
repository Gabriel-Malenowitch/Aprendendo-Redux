import { Provider } from "react-redux";
import { Body } from "./body";
import { configure as store, n } from "./store";

n();


export function Intermediate(){
	return(
		<>
			<Provider store={store}>
				<Body/>
			</Provider> 
		</>
	);
}

