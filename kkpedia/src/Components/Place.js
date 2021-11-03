import React, { useEffect, useState } from "react";
import styled from "styled-components";
import idolimage from "../img/wanted.png";
import firebase from "../utils/firebase";
import { Link, useRouteMatch } from "react-router-dom";
import add from "../img/plus.png";
import NewPlace from "./NewPlace";

const Container = styled.div`
	display: flex;
	background-color: beige;
	padding: 10px;
	width: 25vmin;
	height: 13vmin;
	border-radius: 10px;
	align-items: center;
	margin-left: 3vmin;
`;

const PlaceLink = styled(Link)`
	text-decoration: none;
	color: black;
`;

const EachPlace = styled.div`
	width: 100%;
	display: flex;
`;

const PlaceImage = styled.img`
	width: 10vmin;
	height: 10vmin;
`;

const PlaceText = styled.div`
	height: 10vmin;
	margin-left: 0.5vmin;
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

	const AddSomePlace = () => {
		setPopAddPlace(!popAddPlace);
	};

	// console.log(placeName);

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
								<PlaceLink to={`${url}/place/${item.locationName}`}>
									<EachPlace>
										<PlaceImage src={item.images[0] || idolimage} />
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
