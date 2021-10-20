import React, { useState } from "react";
import { Key } from "./key";
import GoogleMapReact from "google-map-react";
import PlacesAutocomplete, {
	geocodeByAddress,
	geocodeByPlaceId,
	getLatLng,
} from "react-places-autocomplete";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

// Map
const SimpleMap = (props) => {
	const handleApiLoaded = (map, maps) => {
		// use map and maps objects
		console.log("載入完成!"); // 印出「載入完成」
	};
	const getPlace = JSON.parse(window.localStorage.getItem("location"));

	const [address, setAddress] = useState("");
	const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

	const handleSelect = async (pickValue) => {
		const results = await geocodeByAddress(pickValue);
		const latLng = await getLatLng(results[0]);
		setAddress(pickValue);
		setCoordinates(latLng);
		locationInLocal(results);
		console.log(results);
	};

	//暫時存進 localstorage
	function locationInLocal(result) {
		console.log(result[0]);
		const getLocation = JSON.parse(
			window.localStorage.getItem("location" || [])
		);
		const newCartItem = [...getLocation, result[0]];
		window.localStorage.setItem("location", JSON.stringify(newCartItem));
	}

	return (
		// Important! Always set the container height explicitly
		<div style={{ height: "50vh", width: "100%" }}>
			<GoogleMapReact
				bootstrapURLKeys={{ key: Key }}
				defaultCenter={props.center}
				defaultZoom={props.zoom}
				yesIWantToUseGoogleMapApiInternals // 設定為 true
				onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)} // 載入完成後執行
			>
				{/* <AnyReactComponent lat={59.955413} lng={30.337844} text="My Position" /> */}
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
			<PlacesAutocomplete
				value={address}
				onChange={setAddress}
				onSelect={handleSelect}
			>
				{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
					<div>
						<p>Latitude：{coordinates.lat}</p>
						<p>Longitude：{coordinates.lng}</p>

						<input {...getInputProps({ placeholder: "Type address" })} />
						<div>
							{loading ? <div>...loading</div> : null}
							{suggestions.map((suggestion) => {
								const style = {
									backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
								};

								return (
									<div
										{...getSuggestionItemProps(suggestion, { style })}
										key={suggestion.placeId}
									>
										{suggestion.description}
									</div>
								);
							})}
						</div>
					</div>
				)}
			</PlacesAutocomplete>
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
function App() {
	return (
		<div className="App">
			<SimpleMap />
		</div>
	);
}

export default App;
