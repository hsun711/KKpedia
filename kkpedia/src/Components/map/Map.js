import React from "react";
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
	return (
		// Important! Always set the container height explicitly
		<Container>
			<GoogleMapReact
				bootstrapURLKeys={{ key: Key }}
				defaultCenter={props.latitude}
				defaultZoom={props.zoom}
				yesIWantToUseGoogleMapApiInternals // 設定為 true
			>
				<AnyReactComponent
					key={props.placeId}
					lat={props.latitude.lat}
					lng={props.latitude.lng}
					placeId={props.placeId}
					text=""
				/>
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
