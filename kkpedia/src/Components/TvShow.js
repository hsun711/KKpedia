import React, { useState, useEffect } from "react";
import firebase from "../utils/firebase";
import styled from "styled-components";
import TopicContainer from "./TopicContainer";
import board from "../img/cork-board.png";
import NewOne from "./NewOne";

const TitleDiv = styled.div`
	display: flex;
	margin-left: 2vmin;
	align-items: center;
	/* outline: 2px solid black; */
`;

const TopicTitle = styled.p`
	font-size: 7vmin;
	line-height: 7vmin;
	font-weight: 600;
	@media screen and (max-width: 1200px) {
		font-size: 10vmin;
		line-height: 10vmin;
	}
`;

const Add = styled.div`
	margin-top: 2.5vmin;
	margin-bottom: 8px;
	margin-left: 2vmin;
	padding: 0vmin 1vmin;
	background-color: #f8eedb;
	border: 2px solid #422800;
	border-radius: 30px;
	box-shadow: #422800 3px 3px 0 0;
	color: #422800;
	cursor: pointer;
	display: inline-block;
	font-weight: 600;
	font-size: 2vmin;
	/* line-height: 3vmin; */
	text-align: center;
	text-decoration: none;
	user-select: none;
	-webkit-user-select: none;
	touch-action: manipulation;
	&:hover {
		background-color: #f3f4f6;
		box-shadow: #422800 1px 1px 0 0;
		transform: translate(2px, 2px);
	}
	@media screen and (max-width: 1200px) {
		box-shadow: #422800 2px 2px 0 0;
		padding: 0vmin 3vmin;
	}
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
	width: 90%;
	height: 100%;
	margin: 7vmin auto;
	position: relative;
`;

const EachContainer = styled.div`
	min-width: 100%;
	border-radius: 10px;
	background-image: url(${board});
	box-shadow: 10px 10px 30px 5px rgba(0, 0, 0, 0.2);
	display: flex;
	flex-wrap: wrap;
	margin-top: 3vmin;
`;

// const TopicImg = styled.div`
// 	background-image: url(${actionboard});
// 	background-repeat: no-repeat;
// 	background-size: contain;
// 	width: 30vmin;
// 	height: 30vmin;
// 	transform: rotateZ(-20deg);
// `;

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
			{popAddOne ? (
				<div>
					<Cover onClick={AddSomeOne} />
					<NewOne topic="tvshow" setPopAddOne={setPopAddOne} />
				</div>
			) : (
				<ShowContainer>
					<TitleDiv>
						<TopicTitle>綜藝</TopicTitle>
						<Add onClick={AddSomeOne}>新增</Add>
					</TitleDiv>
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
