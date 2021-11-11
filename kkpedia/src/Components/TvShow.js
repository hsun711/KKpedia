import React, { useState, useEffect } from "react";
import firebase from "../utils/firebase";
import styled from "styled-components";
import TopicContainer from "./TopicContainer";
import add from "../img/plus.png";
import board from "../img/cork-board.png";
import actionboard from "../img/actionboard.png";
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

const ShowContainer = styled.div`
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
	border-radius: 10px;
	background-image: url(${board});
	box-shadow: 10px 10px 30px 5px rgba(0, 0, 0, 0.2);
	display: flex;
	flex-wrap: wrap;
	position: absolute;
	top: 23vmin;
	left: 0px;
	@media screen and (max-width: 1024px) {
	}
`;

const TopicImg = styled.div`
	background-image: url(${actionboard});
	background-repeat: no-repeat;
	background-size: contain;
	width: 30vmin;
	height: 30vmin;
	transform: rotateZ(-20deg);
`;

const TopicTitle = styled.p`
	font-size: 7vmin;
	font-weight: 600;
	position: absolute;
	top: 10vmin;
	left: 30vmin;
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
		<>
			<Add onClick={AddSomeOne} />
			{popAddOne ? (
				<div>
					<Cover onClick={AddSomeOne} />
					<NewOne topic="tvshow" setPopAddOne={setPopAddOne} />
				</div>
			) : (
				<ShowContainer>
					<TopicImg />
					<TopicTitle>綜藝</TopicTitle>
					<EachContainer>
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
				</ShowContainer>
			)}
		</>
	);
}

export default TvShow;
