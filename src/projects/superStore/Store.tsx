import { useSelector, useDispatch } from "react-redux";
import { addCart } from "./actions";
import { useReload } from "./hooks";
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
	const reload = useReload();

	return (
		<div style={styler.storeContainer}>
			<ul>
				{data.storeItems && data.storeItems.map( (item: listType) => (
					<li key={item.id}>
						{item.word}
						<button disabled={item.inCart} onClick={()=>{
							dispatch(addCart(item));
							reload();
						}}>
							Add to cart
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}

export default Store;

