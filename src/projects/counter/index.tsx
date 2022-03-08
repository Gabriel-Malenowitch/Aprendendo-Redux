import { Provider } from "react-redux";
import { CounterSon } from "./counterSon";
import { store } from "./store";



export function Counter(){



	return (
		<Provider store={store}>
			<CounterSon/>
		</Provider>
	);
}