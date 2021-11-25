import React, { useState } from "react";
import styled from "styled-components";
import PlacesAutocomplete, {
	geocodeByAddress,
	getLatLng,
} from "react-places-autocomplete";

const InputArea = styled.div`
	width: 100%;
	margin: 2vmin 0px;
	@media screen and (max-width: 1200px) {
		margin: 1vmin 0vmin;
	}
`;

const Input = styled.input`
	border-radius: 10px;
	width: 100%;
	height: 4vmin;
	padding-left: 1vmin;
	padding-top: 0.25vmin;
	font-size: 2vmin;
	@media screen and (max-width: 1200px) {
		height: 5.5vmin;
	}
`;
function MapAutocomplete(props) {
	const [address, setAddress] = useState("");
	const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

	const handleSelect = async (pickValue) => {
		const results = await geocodeByAddress(pickValue);
		const latLng = await getLatLng(results[0]);
		const placeId = results[0].place_id;
		setAddress(pickValue);
		setCoordinates(latLng);

		// 把座標位置和地址、placeId傳回去給父層
		const data = [pickValue, placeId, latLng];
		props.placeaddress(data);
	};

	return (
		<InputArea>
			<PlacesAutocomplete
				value={address}
				onChange={setAddress}
				onSelect={handleSelect}
			>
				{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
					<div>
						<Input {...getInputProps({ placeholder: "請輸入地址" })} />
						<div>
							{loading ? <div>...loading</div> : null}
							{suggestions.map((suggestion) => {
								const style = {
									backgroundColor: suggestion.active ? "#DCC7A6" : "#fff",
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
		</InputArea>
	);
}

export default MapAutocomplete;
