import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Map from "./Map";
import MapTest from "./MapTest";
import MapAutocomplete from "./MapAutocomplete";
import RenderCalender from "./RenderCalender";

ReactDOM.render(
	<React.StrictMode>
		<MapTest />
		{/* <MapAutocomplete /> */}
		{/* <Map /> */}
		{/* <RenderCalender /> */}

		{/* <App /> */}
	</React.StrictMode>,
	document.getElementById("root")
);
