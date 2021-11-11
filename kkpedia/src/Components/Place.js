import React, { useEffect, useState } from "react";
import styled from "styled-components";
import idolimage from "../img/wanted.png";
import firebase from "../utils/firebase";
import { Link, useRouteMatch } from "react-router-dom";
import board from "../img/cork-board.png";
import add from "../img/plus.png";
import sticker from "../img/sticker6.png";
import NewPlace from "./NewPlace";

const OutsideContainer = styled.div`
	width: 100%;
	background-image: url(${board});
	box-shadow: 10px 10px 30px 5px rgba(0, 0, 0, 0.2);
	border-radius: 10px;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	padding: 3vmin;
	@media screen and (max-width: 1024px) {
		margin: 3vmin;
	}
`;

const Container = styled.div`
	display: flex;
	background-image: url(${sticker});
	background-repeat: no-repeat;
	background-size: 100%;
	padding: 1vmin;
	width: 30vmin;
	height: 32vmin;
	align-items: center;
	justify-content: center;
	margin: 3vmin;

	@media screen and (max-width: 1024px) {
		margin: 3vmin 7vmin;
	}
`;

const PlaceLink = styled(Link)`
	text-decoration: none;
	color: black;
`;

const EachPlace = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const ImgContainer = styled.div`
	width: 20vmin;
	height: 20vmin;
	display: flex;
	justify-content: center;
	align-items: center;
	@media screen and (max-width: 1024px) {
		width: 15vmin;
		height: 15vmin;
	}
`;

const PlaceImage = styled.img`
	max-width: 90%;
	max-height: 70%;
	transform: rotateZ(7deg);
`;

const PlaceText = styled.div`
	max-width: 20vmin;
	min-height: 7vmin;
	margin-top: -2vmin;
	transform: rotateZ(7deg);
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-left: -2.5vmin;
	@media screen and (max-width: 1024px) {
		padding-top: 1vmin;
	}
`;

const PlaceTitle = styled.p`
	font-size: 3vmin;
	font-weight: 600;
	@media screen and (max-width: 500px) {
		font-size: 1vmin;
	}
`;
const PlaceDesp = styled.p`
	/* margin-top: 0.75vmin; */
	font-size: 1.5vmin;
	color: #34495e;
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
	@media screen and (max-width: 500px) {
		font-size: 1vmin;
	}
`;

const Add = styled.div`
	background-image: url(${add});
	background-repeat: no-repeat;
	background-size: 100%;
	width: 7vmin;
	height: 7vmin;
	position: fixed;
	bottom: 3vmin;
	right: 3vmin;
	cursor: pointer;
`;

const Cover = styled.div`
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	background-color: black;
	opacity: 0.8;
	z-index: 2;
`;

function Place({ title, topic }) {
	let { path, url } = useRouteMatch();
	const [popAddPlace, setPopAddPlace] = useState(false);
	const [place, setPlace] = useState([]);
	const [placeName, setPlaceName] = useState("");
	const db = firebase.firestore();
	const docRef = db.collection("categories");

	// console.log(topic);

	const AddSomePlace = () => {
		setPopAddPlace(!popAddPlace);
	};

	useEffect(() => {
		let isMounted = true;
		docRef
			.doc(`${title}`)
			.collection("places")
			.onSnapshot((snapshot) => {
				const placeDetail = [];
				snapshot.forEach((doc) => {
					placeDetail.push(doc.data());
				});
				// console.log(placeDetail);
				setPlace(placeDetail);
			});
		return () => {
			isMounted = false;
		};
	}, []);
	return (
		<OutsideContainer>
			<Add onClick={AddSomePlace} topic="Idol" />
			{popAddPlace ? (
				<div>
					<Cover onClick={AddSomePlace} />
					<NewPlace
						topic={topic}
						title={title}
						setPopAddPlace={setPopAddPlace}
						setPlaceName={setPlaceName}
					/>
				</div>
			) : (
				<>
					{place.map((item) => {
						return (
							<Container key={item.locationName}>
								<PlaceLink to={`${url}/${item.locationName}`}>
									<EachPlace>
										<ImgContainer>
											<PlaceImage src={item.images[0] || idolimage} />
										</ImgContainer>
										<PlaceText>
											<PlaceTitle>{item.locationName}</PlaceTitle>
											<PlaceDesp>{item.description}</PlaceDesp>
										</PlaceText>
									</EachPlace>
								</PlaceLink>
							</Container>
						);
					})}
				</>
			)}
		</OutsideContainer>
	);
}

export default Place;
