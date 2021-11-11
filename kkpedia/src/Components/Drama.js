import React, { useState, useEffect } from "react";
import firebase from "../utils/firebase";
import styled from "styled-components";
import TopicContainer from "./TopicContainer";
import add from "../img/plus.png";
import board from "../img/cork-board.png";
import dramaMedal from "../img/0LprnB1mp1.png";
import NewOne from "./NewOne";

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

const DramaContainer = styled.div`
	width: 80%;
	height: 100%;
	margin: 7vmin auto;
	position: relative;
	@media screen and (max-width: 1024px) {
		width: 90%;
	}
`;
const EachContainer = styled.div`
	min-width: 100%;
	background-image: url(${board});
	box-shadow: 10px 10px 30px 5px rgba(0, 0, 0, 0.2);
	border-radius: 10px;
	display: flex;
	flex-wrap: wrap;
	position: absolute;
	top: 25vmin;
	left: 0px;
	@media screen and (max-width: 1024px) {
	}
`;

const TopicImg = styled.div`
	background-image: url(${dramaMedal});
	background-repeat: no-repeat;
	background-size: contain;
	width: 30vmin;
	height: 30vmin;
	transform: rotateZ(-15deg);
`;

const TopicTitle = styled.p`
	font-size: 7vmin;
	font-weight: 600;
	position: absolute;
	top: 13vmin;
	left: 25vmin;
`;

function Drama() {
	const [popAddOne, setPopAddOne] = useState(false);
	const [titleName, setTitileName] = useState([]);
	const db = firebase.firestore();
	const docRef = db.collection("categories");

	const AddSomeOne = () => {
		setPopAddOne(!popAddOne);
	};

	useEffect(() => {
		docRef.where("topic", "==", "drama").onSnapshot((querySnapshot) => {
			const item = [];
			querySnapshot.forEach((doc) => {
				// doc.data() is never undefined for query doc snapshots
				item.push({ star: doc.data() });
			});
			setTitileName(item);
		});
	}, []);

	return (
		<>
			<Add onClick={AddSomeOne} />
			{popAddOne ? (
				<div>
					<Cover onClick={AddSomeOne} />
					<NewOne topic="drama" setPopAddOne={setPopAddOne} />
				</div>
			) : (
				<DramaContainer>
					<TopicImg />
					<TopicTitle>戲劇</TopicTitle>
					<EachContainer>
						{titleName.map((item) => {
							return (
								<TopicContainer
									topic="drama"
									item={item}
									key={item.star.title}
								/>
							);
						})}
					</EachContainer>
				</DramaContainer>
			)}
		</>
	);
}

export default Drama;
