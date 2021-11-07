import React, { useEffect, useState } from "react";
import firebase from "../utils/firebase";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import sticker from "../img/sticker3.png";
import { Link } from "react-router-dom";

const BannerContainer = styled.div`
	width: 100%;
	height: 37vmin;
	background-color: black;
	margin: auto;
	@media screen and (max-width: 992px) {
		height: 25vmin;
	}
`;

const Banner = styled.img`
	width: 100%;
	max-height: 100%;
`;

const EachContainer = styled.div`
	width: 90%;
	height: 100%;
	margin: 0vmin auto;
	padding: 5vmin 0px;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
`;

const EachTopic = styled.div`
	background-image: url(${sticker});
	background-repeat: no-repeat;
	background-size: 100%;
	width: 35vmin;
	height: 35vmin;
	margin: 0px 5vmin;
	display: flex;
	align-items: center;
	justify-content: center;
	@media screen and (max-width: 992px) {
		width: 60vmin;
		height: 60vmin;
	}
`;

const TopicLink = styled(Link)`
	text-decoration: none;
	font-size: 4vmin;
	font-weight: 600;
	color: black;
	&:hover {
		transform: scale(1.1);
		transition: all 0.3s;
		color: red;
	}
`;

function Home() {
	return (
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
	);
}

export default Home;
