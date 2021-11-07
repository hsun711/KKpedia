import React, { useEffect, useState } from "react";
import styled from "styled-components";
import idolimage from "../img/wanted.png";
import firebase from "../utils/firebase";
import { Link, useRouteMatch } from "react-router-dom";
import add from "../img/plus.png";
import sticker from "../img/sticker4.png";
import NewPlace from "./NewPlace";

const Container = styled.div`
	display: flex;
	background-color: beige;
	padding: 1vmin;
	width: 30vmin;
	min-height: 20vmin;
	border-radius: 10px;
	align-items: center;
	justify-content: center;
	margin-left: 3vmin;
	margin-bottom: 3vmin;
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
	/* background-image: url(${sticker});
	background-repeat: no-repeat;
	background-size: 100%; */
	width: 20vmin;
	height: 20vmin;
	display: flex;
	justify-content: center;
`;

const PlaceImage = styled.img`
	max-width: 100%;
	max-height: 100%;
`;

const PlaceText = styled.div`
	min-width: 20vmin;
	min-height: 7vmin;
	text-align: center;
	padding-top: 2vmin;
`;

const PlaceTitle = styled.p`
	font-size: 2vmin;
	font-weight: 600;
`;
const PlaceDesp = styled.p`
	margin-top: 1vmin;
	font-size: 1.5vmin;
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
	}, []);
	return (
		<>
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
		</>
	);
}

export default Place;
