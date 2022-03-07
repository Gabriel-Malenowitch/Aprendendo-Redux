import { styler } from "./style";
import { connect, useSelector } from "react-redux";

type listType = {
    id: number,
    word: string,
    inCart: true | false,
}
type dataType = {
    storeItems: listType[],
    cartItems: listType[],
}


function Cart({data, dispatch}: any){
// function Cart(){
	// const data = useSelector((data: dataType)=>data);
	console.log(data);
	return (
		<div style={styler.cartContainer}>
			<ul>
				{data.cartItems && data.cartItems.map((item: listType)=>{
					return (
						<li key={item.id}>
							{item.word }
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default connect(data=>({data}))(Cart);
// export default Cart;
