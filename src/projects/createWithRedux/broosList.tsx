import { useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { useReload } from "./hooks";



type itemTypeList = {
    id: number, 
    word: string,
}
type dataType = {
    showFakeListData: itemTypeList[],
    dataList: itemTypeList[],
    lastOperation: null | false | true,
}

let cont = 0;
let interval: any = null;

export function BroosList(){
	const [ bro, setBro ] = useState("");
	const reload = useReload();
	const data = useSelector((d: dataType)=>d);
	const dispatch = useDispatch();

    
	if(interval){
		if(data.lastOperation === true || data.lastOperation === false){
			if(data.lastOperation){
				alert("Ordem criada, parabéns : )");
			}else{
				alert("Infelizmente tivemos um problema ao processar sua ordem... :/");

			}
			dispatch({type: "resetLastOperation"});
			clearInterval(interval);
		}
	}



	const submit = () => {
		if(bro !== ""){
            
			dispatch({
				type: "create",
				word: bro,
			});

			setBro("");

			interval = setInterval(()=>{
				reload();

				if(cont >= 10) document.location.reload();

				cont += 1;
			}, 1500);
		}else{
            
			alert("preencha o bagulho alí por gentileza");
		}
	};


	return(
		<>
			<div>
				<table>
					<thead>
						<tr>
							<th>id</th>
							<th>Nome</th>
						</tr>
					</thead>
					<tbody>
						{data.showFakeListData.map((item: itemTypeList, id: number)=>(
							<tr key={id}>
								<td>{item.id}</td>
								<td>{item.word}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div>
				<input onChange={e=>setBro(e.target.value)} value={bro} placeholder="BroName" type="text" />
				<button onClick={submit}>Enviar</button>
			</div>
		</>
	);
}