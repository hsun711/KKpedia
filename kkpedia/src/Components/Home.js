import React, { useEffect, useState } from "react";
import firebase from "../utils/firebase";
import styled from "styled-components";
import board from "../img/cork-board.png";
import sticker from "../img/sticker5.png";
import photos from "../img/photos.png";
import btsphotos from "../img/135739274.png";
import { Link } from "react-router-dom";

const PhotoDecorate = styled.div`
	width: 80vmin;
	height: 50vmin;
	position: fixed;
	margin-top: -29vmin;
	margin-left: -10vmin;
	background-image: url(${photos});
	background-size: cover;
	background-repeat: no-repeat;
`;

const EachContainer = styled.div`
	width: 70%;
	/* height: 50vh; */
	background-image: url(${board});
	box-shadow: 10px 10px 30px 5px rgba(0, 0, 0, 0.25);
	border-radius: 10px;
	margin: 26vmin auto;
	padding: 10vmin 0px;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	@media screen and (max-width: 1024px) {
		width: 80%;
		margin: 10vmin auto;
	}
	@media screen and (max-width: 550px) {
		height: 85vmax;
	}
`;

const EachTopic = styled.div`
	background-image: url(${sticker});
	background-repeat: no-repeat;
	background-size: contain;
	background-position: center;
	width: 30vmin;
	height: 30vmin;
	margin: 0px 3vmin;
	display: flex;
	align-items: center;
	justify-content: center;
	@media screen and (max-width: 1024px) {
		width: 40vmin;
		height: 40vmin;
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
		color: #079992;
	}
	@media screen and (max-width: 1024px) {
		font-size: 6vmin;
	}
`;

const Photos = styled.div`
	background-image: url(${btsphotos});
	background-size: cover;
	background-repeat: no-repeat;
	width: 40vmin;
	height: 40vmin;
	position: fixed;
	bottom: 0vmin;
	right: 0vmin;
	@media screen and (max-width: 1024px) {
		width: 35vmin;
		height: 35vmin;
	}
`;

function Home() {
	return (
		<>
			<PhotoDecorate></PhotoDecorate>
			<EachContainer>
				<EachTopic>
					<TopicLink to="/idol">藝人</TopicLink>
				</EachTopic>
				<EachTopic>
					<TopicLink to="/drama">戲劇</TopicLink>
				</EachTopic>
				<EachTopic>
					<TopicLink to="/tvshow">綜藝</TopicLink>
				</EachTopic>
			</EachContainer>
			<Photos></Photos>
		</>
	);
}

export default Home;
