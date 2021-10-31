import React, { useState } from "react";
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
	background-size: 95%;
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

function NewPicture({ title, setPopAddOne }) {
	const db = firebase.firestore();

	return (
		<Container>
			<InputTitle>藝人 / 戲劇 / 綜藝名稱：{title}</InputTitle>
			<ArtistName>
				<ShortTitle>照片簡述：</ShortTitle>
				<InputArea />
			</ArtistName>
			<ArtistName>
				<ShortTitle>上傳照片：</ShortTitle>
				<Add />
			</ArtistName>
			<SendBtn />
		</Container>
	);
}

export default NewPicture;
