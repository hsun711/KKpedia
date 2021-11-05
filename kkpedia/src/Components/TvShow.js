import React, { useState, useEffect } from "react";
import firebase from "../utils/firebase";
import styled from "styled-components";
import TopicContainer from "./TopicContainer";
import add from "../img/plus.png";
import board from "../img/cork-board.png";
import NewOne from "./NewOne";

const MainContainer = styled.div`
	width: 100%;
	display: flex;
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

const EachContainer = styled.div`
	width: 70%;
	height: 100%;
	margin: 20vmin auto;
	padding: 5vmin 0px;
	background-image: url(${board});
	display: flex;
	/* justify-content: center; */
	flex-wrap: wrap;
	@media screen and (max-width: 992px) {
		margin: 90px auto;
	}
`;
const TopicTitle = styled.p`
	font-size: 3vmin;
	font-weight: 600;
`;

function TvShow() {
	const [popAddOne, setPopAddOne] = useState(false);
	const [titleName, setTitileName] = useState([]);
	const db = firebase.firestore();
	const docRef = db.collection("categories");

	const AddSomeOne = () => {
		setPopAddOne(!popAddOne);
	};

	useEffect(() => {
		docRef.where("topic", "==", "tvshow").onSnapshot((querySnapshot) => {
			const item = [];
			querySnapshot.forEach((doc) => {
				// doc.data() is never undefined for query doc snapshots
				item.push({ star: doc.data() });
			});
			setTitileName(item);
		});
	}, []);
	return (
		<MainContainer>
			<Add onClick={AddSomeOne} />
			{popAddOne ? (
				<div>
					<Cover onClick={AddSomeOne} />
					<NewOne topic="tvshow" setPopAddOne={setPopAddOne} />
				</div>
			) : (
				<EachContainer>
					<TopicTitle>TV Show</TopicTitle>
					{titleName.map((item) => {
						return (
							<TopicContainer
								topic="tvshow"
								item={item}
								key={item.star.title}
							/>
						);
					})}
				</EachContainer>
			)}
		</MainContainer>
	);
}

export default TvShow;
