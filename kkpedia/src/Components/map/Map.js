import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import { Key } from "../../key";
import styled from "styled-components";
import pin from "../../img/pin-map.png";

const AnyReactComponent = ({ text }) => <Pin />;

const Container = styled.div`
	width: 100%;
	height: 20vmin;
`;

const Pin = styled.div`
	background-image: url(${pin});
	background-repeat: no-repeat;
	background-size: 100%;
	width: 3vmin;
	height: 3vmin;
`;

// Map
const SimpleMap = (props) => {
	const handleApiLoaded = (map, maps) => {
		// use map and maps objects
		// console.log("載入完成!");
	};
	const [places, setPlaces] = useState([props]);

	return (
		// Important! Always set the container height explicitly
		<Container>
			<GoogleMapReact
				bootstrapURLKeys={{ key: Key }}
				defaultCenter={props.latitude}
				defaultZoom={props.zoom}
				yesIWantToUseGoogleMapApiInternals // 設定為 true
				onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)} // 載入完成後執行
			>
				{places.map((item) => (
					<AnyReactComponent
						key={item.placeId}
						lat={item.latitude.lat}
						lng={item.latitude.lng}
						placeId={item.placeId}
						text=""
					/>
				))}
			</GoogleMapReact>
		</Container>
	);
};

// 由於改寫成 functional component，故另外設定 defaultProps
SimpleMap.defaultProps = {
	center: {
		lat: 25.04,
		lng: 121.5,
	},
	zoom: 15,
};

// App
function Map({ latitude, placeId }) {
	return <SimpleMap latitude={latitude} placeId={placeId} />;
}

export default Map;
