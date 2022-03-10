import React from "react";
import ReactDOM from "react-dom";
// import { createServer } from "miragejs";
import "./index.css";
import App from "./App";
import { listAlphabeticGenerator } from "./projects/data-generator";


// createServer({
// 	routes() {
// 		this.namespace = "api";

// 		this.get("/movies", () => {
// 			return {
// 				movies: [
// 					{ id: 1, name: "Inception", year: 2010 },
// 					{ id: 2, name: "Interstellar", year: 2014 },
// 					{ id: 3, name: "Dunkirk", year: 2017 },
// 				],
// 			};
// 		});
// 	},
// });

// fetch("localhost:3000/api/movies").then(e=>e.json()).then(e=>console.log(e));

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);
