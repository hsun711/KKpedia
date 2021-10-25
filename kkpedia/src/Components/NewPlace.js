import React, { useEffect, useState } from "react";
import styled from "styled-components";
import add from "../img/plus.png";
import send from "../img/submit.png";
import MapAutocomplete from "./MapAutocomplete";

const Container = styled.div`
	width: 80vmin;
	height: 80vh;
	background-color: beige;
	position: fixed;
	top: 50%;
	left: 50%;
	margin-left: -40vmin;
	margin-top: -35vh;
	padding: 5vmin 4vmin;
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
	padding-left: 20px;
	padding-top: 0.25vmin;
	font-size: 2vmin;
	@media screen and (max-width: 800px) {
		font-size: 1.5vmin;
	}
`;

const Title = styled.div`
	width: 100%;
	margin-top: 3vmin;
	display: flex;
	align-items: center;
`;

const ShortTitle = styled(InputTitle)`
	width: 25vmin;
`;

const Add = styled.div`
	background-image: url(${add});
	background-size: 100%;
	background-repeat: no-repeat;
	width: 4vmin;
	height: 4vmin;
`;

const SendBtn = styled.div`
	background-image: url(${send});
	background-size: 90%;
	background-repeat: no-repeat;
	width: 10vmin;
	height: 10vmin;
	border-radius: 10px;
	margin-left: 60vmin;
	cursor: pointer;
	&:hover {
		background-position-x: 2px;
		background-position-y: 2px;
	}
`;

function NewPlace({ title }) {
	return (
		<Container>
			<InputTitle>藝人 / 戲劇 / 綜藝名稱：{title}</InputTitle>
			<Title>
				<ShortTitle>貢獻者暱稱：</ShortTitle>
				<InputArea />
			</Title>
			<Title>
				<ShortTitle>景點/餐廳名稱：</ShortTitle>
				<InputArea />
			</Title>
			<Title>
				<ShortTitle>景點/餐廳描述：</ShortTitle>
				<InputArea placeholder="ex.哪個藝人po文的、哪個場景出現的" />
			</Title>
			<Title>
				<ShortTitle>詳細地址：</ShortTitle>
				<MapAutocomplete />
			</Title>
			<Title>
				<ShortTitle>上傳照片：</ShortTitle>
				<Add />
			</Title>
			<SendBtn />
		</Container>
	);
}

export default NewPlace;
