import React, { useEffect, useState } from "react";
import styled from "styled-components";
import firebase from "../utils/firebase";
import add from "../img/plus.png";
import send from "../img/submit.png";

const Container = styled.div`
	width: 70vmin;
	background-color: beige;
	position: fixed;
	top: 50%;
	left: 50%;
	margin-left: -35vmin;
	margin-top: -40vh;
	padding: 5vmin 7vmin;
	display: flex;
	flex-direction: column;
	z-index: 5;
`;

const InputTitle = styled.p`
	width: 55vmin;
	font-size: 2.5vmin;
	font-weight: 600;
`;

const InputArea = styled.input`
	border-radius: 5px;
	width: 100%;
	height: 4vmin;
	margin: 15px 0px;
	padding-left: 10px;
	font-size: 2vmin;
	@media screen and (max-width: 800px) {
		font-size: 1.5vmin;
	}
`;

const ArtistName = styled.div`
	width: 100%;
	margin-top: 3vmin;
	display: flex;
	align-items: center;
`;

const ShortTitle = styled(InputTitle)`
	width: 20vmin;
`;

const Add = styled.div`
	background-image: url(${add});
	background-size: 100%;
	background-repeat: no-repeat;
	width: 5vmin;
	height: 5vmin;
`;

const SendBtn = styled.div`
	background-image: url(${send});
	background-size: 100%;
	background-repeat: no-repeat;
	width: 10vmin;
	height: 10vmin;
	border-radius: 10px;
	margin-left: 45vmin;
	cursor: pointer;
	&:hover {
		background-position-x: 2px;
		background-position-y: 2px;
	}
`;

function NewOne({ topic }) {
	const db = firebase.firestore();
	const [title, setTitle] = useState();
	const [ig, setIg] = useState();
	const [fb, setFb] = useState();
	const [twitter, setTwitter] = useState();
	const [youtube, setYoutube] = useState();

	const SendNewOn = () => {
		db.collection("categories")
			.doc(`${title}`)
			.set(
				{
					topic: topic,
					title: title,
					facebook: fb,
					instagram: ig,
					twitter: twitter,
					youtube: youtube,
				},
				{ merge: true }
			)
			.then((docRef) => {
				console.log("😁😁😁😁");
			});
	};

	return (
		<Container>
			<InputTitle>類別：{topic}</InputTitle>
			<ArtistName>
				<InputTitle>藝人 / 戲劇 / 綜藝名稱：</InputTitle>
				<InputArea
					value={title}
					onChange={(e) => {
						setTitle(e.target.value);
					}}
				/>
			</ArtistName>
			<ArtistName>
				<ShortTitle>instagram：</ShortTitle>
				<InputArea
					value={ig}
					onChange={(e) => {
						setIg(e.target.value);
					}}
				/>
			</ArtistName>
			<ArtistName>
				<ShortTitle>facebook：</ShortTitle>
				<InputArea
					value={fb}
					onChange={(e) => {
						setFb(e.target.value);
					}}
				/>
			</ArtistName>
			<ArtistName>
				<ShortTitle>twitter：</ShortTitle>
				<InputArea
					value={twitter}
					onChange={(e) => {
						setTwitter(e.target.value);
					}}
				/>
			</ArtistName>
			<ArtistName>
				<ShortTitle>youtube：</ShortTitle>
				<InputArea
					value={youtube}
					onChange={(e) => {
						setYoutube(e.target.value);
					}}
				/>
			</ArtistName>
			<ArtistName>
				<ShortTitle>上傳封面圖：</ShortTitle>
				<Add />
			</ArtistName>
			<SendBtn onClick={SendNewOn} />
		</Container>
	);
}

export default NewOne;
