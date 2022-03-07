import { styler } from "./style";
import { connect, useDispatch, useSelector } from "react-redux";
import { useReload } from "./hooks";
import { removeCart } from "./actions";

type listType = {
    id: number,
    word: string,
    inCart: true | false,
}
type dataType = {
    storeItems: listType[],
    cartItems: listType[],
}


// function Cart({data, dispatch}: any){
function Cart(){
	const data = useSelector((data: dataType)=>data);
	const dispatch = useDispatch();
	const reload = useReload();

	return (
		<div style={styler.cartContainer}>
			<ul>
				{data.cartItems && data.cartItems.map((item: listType, index: number)=>{
					return (
						<li key={item.id}>
							{item.word }
							<button onClick={()=>{
								dispatch(removeCart(item, index));
								reload();
							}}>
								Remove from cart
							</button>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

// export default connect(data=>({data}))(Cart);
export default Cart;
