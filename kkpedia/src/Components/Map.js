import React from "react";
import GoogleMapReact from "google-map-react";
import { Key } from "../key";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

// Map
const SimpleMap = (props) => {
	const handleApiLoaded = (map, maps) => {
		// use map and maps objects
		console.log("載入完成!"); // 印出「載入完成」
	};
	const getPlace = JSON.parse(window.localStorage.getItem("location"));

	return (
		// Important! Always set the container height explicitly
		<div style={{ height: "100vh", width: "100%" }}>
			<GoogleMapReact
				bootstrapURLKeys={{ key: Key }}
				defaultCenter={props.center}
				defaultZoom={props.zoom}
				yesIWantToUseGoogleMapApiInternals // 設定為 true
				onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)} // 載入完成後執行
			>
				{getPlace.map((item) => (
					<AnyReactComponent
						key={item.place_id}
						lat={item.geometry.location.lat}
						lng={item.geometry.location.lng}
						placeId={item.place_id}
						text="🏳‍🌈"
					/>
				))}
			</GoogleMapReact>
		</div>
	);
};

// 由於改寫成 functional component，故另外設定 defaultProps
SimpleMap.defaultProps = {
	center: {
		lat: 25.04,
		lng: 121.5,
	},
	zoom: 7,
};

// App
function Map() {
	return (
		<div className="App">
			<SimpleMap />
		</div>
	);
}

export default Map;
