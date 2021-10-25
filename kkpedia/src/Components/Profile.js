import React, { useState } from "react";
import styled from "styled-components";
import PersonalData from "./PersonalData";
import PersonalFavorite from "./PersonalFavorite";
import PersonalPost from "./PersonalPost";
import personimage from "../img/wanted.png";
import levelImg from "../img/level-up.png";
import profile from "../img/resume.png";
import like from "../img/place.png";
import post from "../img/comment.png";
import board from "../img/cork-board.png";

const MainContainer = styled.div`
	width: 100%;
	display: flex;
	/* outline: 10px solid black; */
`;

const Container = styled.div`
	width: 70%;
	height: 100%;
	margin: 20vmin auto;
	padding: 0px 5vmin 7vmin;
	background-color: beige;
	display: flex;
	flex-direction: column;
	@media screen and (max-width: 992px) {
		margin: 90px auto;
	}
`;

const Person = styled.div`
	margin-top: 30px;
	margin-left: 30px;
	display: flex;
`;

const PersonName = styled.p`
	font-size: 4vmin;
	text-align: center;
	align-self: center;
`;

const PersonImage = styled.img`
	margin-left: 2vmin;
	width: 5vmin;
	height: 5vmin;
	border-radius: 50%;
	outline: 1px solid black;
`;

const LevelTag = styled.p`
	font-size: 3vmin;
	font-weight: 600;
	margin-left: 1.5vmin;
	text-align: center;
	align-self: center;
`;

const LevelImg = styled.img`
	width: 2vmin;
`;

const MenuBar = styled.div`
	margin-top: 7vmin;
	margin-left: 5vmin;
	display: flex;
`;

const MenuLink = styled.div`
	font-size: 2vmin;
	font-weight: 600;
	margin-right: 5vmin;
	cursor: pointer;
`;

const MenuImage = styled.img`
	width: 2vmin;
	margin-right: 5px;
`;

const ProfileContainer = styled.div`
	background-image: url(${board});
	margin-top: 5vmin;
	padding: 4vmin;
`;

function Profile() {
	const [personal, setPersonal] = useState("RenderProfile");
	const RenderProfile = () => {
		console.log("RenderProfile");
		setPersonal("RenderProfile");
	};
	const RenderLikePlace = () => {
		console.log("RenderLikePlace");
		setPersonal("RenderLikePlace");
	};
	const RenderPost = () => {
		console.log("RenderPost");
		setPersonal("RenderPost");
	};
	return (
		<MainContainer>
			<Container>
				<Person>
					<PersonName>User</PersonName>
					<PersonImage src={personimage} />
					<LevelTag>
						<LevelImg src={levelImg} />
						10
					</LevelTag>
				</Person>
				<MenuBar>
					<MenuLink onClick={RenderProfile}>
						<MenuImage src={profile} />
						個人資料
					</MenuLink>
					<MenuLink onClick={RenderLikePlace}>
						<MenuImage src={like} />
						收藏景點
					</MenuLink>
					<MenuLink onClick={RenderPost}>
						<MenuImage src={post} />
						過往PO文
					</MenuLink>
				</MenuBar>
				<ProfileContainer></ProfileContainer>
			</Container>
		</MainContainer>
	);
}

export default Profile;
