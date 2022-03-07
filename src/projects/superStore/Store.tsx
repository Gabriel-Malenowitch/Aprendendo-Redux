import { useSelector, useDispatch } from "react-redux";
import { addCart } from "./actions";
import { styler } from "./style";

type listType = {
    id: number,
    word: string,
    inCart: true | false,
}
type dataType = {
    storeItems: listType[],
    cartItems: listType[],
}

function Store(){
	const data = useSelector((data: dataType)=>data);
	const dispatch = useDispatch();

	return (
		<div style={styler.storeContainer}>
			<ul>
				{data.storeItems && data.storeItems.map( (item: listType) => (
					<li key={item.id}>
						{item.word}
						<button onClick={()=>dispatch(addCart(item))}>
							Add to cart
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}

export default Store;

