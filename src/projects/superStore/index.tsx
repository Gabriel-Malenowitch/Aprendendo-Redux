import Store from "./Store";
import Cart from "./Cart";
import { Provider } from "react-redux";
import { store } from "./store-data";
import { styler } from "./style";

export function SuperStore(){
	return (
		<Provider store={store} >
			<div style={styler.container}>
				<Store/>
				<Cart/>
			</div>
		</Provider>
	);
}

