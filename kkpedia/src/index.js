import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import NewOne from "./Components/NewOne";
import LoginPage from "./Components/LoginPage";
import MapTest from "./Components/MapTest";
import RenderCalender from "./Components/RenderCalender";

ReactDOM.render(
	<BrowserRouter>
		{/* <MapTest /> */}
		{/* <RenderCalender /> */}
		<App />
		{/* <NewOne /> */}
		{/* <LoginPage /> */}
	</BrowserRouter>,
	document.getElementById("root")
);
