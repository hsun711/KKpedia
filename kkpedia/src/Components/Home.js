import React, { useEffect, useState } from "react";
import styled from "styled-components";
import board from "../img/cork-board.png";
import sticker7 from "../img/sticker7.png";
import sticker8 from "../img/sticker8.png";
import sticker9 from "../img/sticker9.png";
import photos from "../img/photos.png";
import leftphotos from "../img/images.png";
import rightphotos from "../img/135739274.png";
import { Link } from "react-router-dom";

const EachContainer = styled.div`
	width: 80%;
	background-image: url(${board});
	box-shadow: 10px 10px 30px 5px rgba(0, 0, 0, 0.25);
	border-radius: 10px;
	margin: 12vmin auto 0;
	display: flex;
	flex-wrap: wrap;
	@media screen and (max-width: 992px) {
		margin: 12vmin auto;
	}
`;

const PhotoDecorate = styled.div`
	width: 50vmin;
	height: 15vmin;
	background-image: url(${photos});
	background-size: 100%;
	background-repeat: no-repeat;
`;

const TopicArea = styled.div`
	width: 90%;
	margin: 0 auto;
	display: flex;
	justify-content: space-evenly;
	@media screen and (max-width: 992px) {
		flex-direction: column;
		align-items: center;
	}
`;

const EachTopic = styled.div`
	background-image: url(${(props) => props.imgCover});
	background-repeat: no-repeat;
	background-size: contain;
	background-position: center;
	width: 30vmin;
	height: 30vmin;
	display: flex;
	align-items: center;
	justify-content: center;
	@media screen and (max-width: 1200px) {
		width: 35vmin;
		height: 35vmin;
	}
	@media screen and (max-width: 550px) {
		width: 45vmin;
		height: 45vmin;
	}
`;

const TopicLink = styled(Link)`
	text-decoration: none;
	margin-left: 1.5vmin;
	margin-bottom: 2vmin;
	font-size: 5vmin;
	font-weight: 600;
	color: white;
	&:hover {
		transform: scale(1.1);
		transition: all 0.3s;
		color: #f8eedb;
	}
	@media screen and (max-width: 1200px) {
		font-size: 6vmin;
	}
`;

const Photos = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
`;
const Photo = styled.img`
	width: 25vmin;
	height: 100%;
`;

function Home() {
	return (
		<EachContainer>
			<PhotoDecorate></PhotoDecorate>
			<TopicArea>
				<EachTopic imgCover={sticker7}>
					<TopicLink to="/idol">藝人</TopicLink>
				</EachTopic>
				<EachTopic imgCover={sticker9}>
					<TopicLink to="/drama">戲劇</TopicLink>
				</EachTopic>
				<EachTopic imgCover={sticker8}>
					<TopicLink to="/tvshow">綜藝</TopicLink>
				</EachTopic>
			</TopicArea>
			<Photos>
				<Photo src={leftphotos}></Photo>
				<Photo src={rightphotos}></Photo>
			</Photos>
		</EachContainer>
	);
}

export default Home;
