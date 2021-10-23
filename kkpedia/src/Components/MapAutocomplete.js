import React, { useState } from "react";
import PlacesAutocomplete, {
	geocodeByAddress,
	geocodeByPlaceId,
	getLatLng,
} from "react-places-autocomplete";

function MapAutocomplete() {
	const [address, setAddress] = useState("");
	const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

	const handleSelect = async (pickValue) => {
		const results = await geocodeByAddress(pickValue);
		const latLng = await getLatLng(results[0]);
		setAddress(pickValue);
		setCoordinates(latLng);
		console.log(results);
	};
	return (
		<div>
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
}

export default MapAutocomplete;
