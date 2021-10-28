import React, { useState } from "react";
import styled from "styled-components";
import Map from "./Map";
import img from "../img/wanted.png";

const ProfileContainer = styled.div`
	background-color: #c7ecee;
	margin-top: 5vmin;
	padding: 4vmin;
`;

const MapArea = styled.div`
	width: 100%;
	margin: 1vmin 0px;
`;

const CollectionArea = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	margin-top: 5vmin;
	padding: 2vmin 3vmin;
`;

const EachPlace = styled.div`
	width: 30vmin;
	display: flex;
	margin-bottom: 2vmin;
	margin-right: 3vmin;
`;

const PlaceImg = styled.img`
	width: 8vmin;
	height: 8vmin;
`;

const PlaceTxt = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-left: 1vmin;
`;

const TitleTxt = styled.p`
	font-size: 2vmin;
	font-weight: 600;
`;

const NormalTxt = styled.p`
	font-size: 1vmin;
	margin-top: 1.5vmin;
`;

function PersonalFavorite() {
	const [collectPlace, setCollectPlace] = useState("南山塔");
	const [placeDetail, setplaceDetail] = useState(
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit."
	);

	return (
		<ProfileContainer>
			<MapArea>{/* <Map /> */}</MapArea>
			<CollectionArea>
				<EachPlace>
					<PlaceImg src={img} />
					<PlaceTxt>
						<TitleTxt>{collectPlace}</TitleTxt>
						<NormalTxt>{placeDetail}</NormalTxt>
					</PlaceTxt>
				</EachPlace>
				<EachPlace>
					<PlaceImg src={img} />
					<PlaceTxt>
						<TitleTxt>{collectPlace}</TitleTxt>
						<NormalTxt>{placeDetail}</NormalTxt>
					</PlaceTxt>
				</EachPlace>
				<EachPlace>
					<PlaceImg src={img} />
					<PlaceTxt>
						<TitleTxt>{collectPlace}</TitleTxt>
						<NormalTxt>{placeDetail}</NormalTxt>
					</PlaceTxt>
				</EachPlace>
			</CollectionArea>
		</ProfileContainer>
	);
}

export default PersonalFavorite;
