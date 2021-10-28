import React, { useState } from "react";
import styled from "styled-components";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import firebase from "../utils/firebase";
import PersonalData from "./PersonalData";
import PersonalFavorite from "./PersonalFavorite";
import PersonalPost from "./PersonalPost";
import userImg from "../img/user.png";
import levelImg from "../img/level-up.png";
import profile from "../img/resume.png";
import like from "../img/place.png";
import post from "../img/comment.png";

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
	cursor: pointer;
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

const MenuLink = styled(Link)`
	font-size: 2vmin;
	font-weight: 600;
	margin-right: 5vmin;
	text-decoration: none;
	color: black;
`;

const MenuImage = styled.img`
	width: 2vmin;
	margin-right: 5px;
`;

function Profile() {
	const user = firebase.auth().currentUser;
	const db = firebase.firestore();
	const userId = user.uid;
	const docRef = db.collection("users").doc(`${userId}`);
	const [userName, setUserName] = useState("");

	docRef.get().then((doc) => {
		if (doc.exists) {
			setUserName(doc.data().userName);
		} else {
			// doc.data() will be undefined in this case
			console.log("No such document!");
		}
	});

	return (
		<MainContainer>
			<Container>
				<Person>
					<PersonName>{user.displayName || userName}</PersonName>
					<PersonImage src={user.photoURL || userImg} />
					<LevelTag>
						<LevelImg src={levelImg} />
						10
					</LevelTag>
				</Person>
				<BrowserRouter>
					<MenuBar>
						<MenuLink to="/profile">
							<MenuImage src={profile} />
							個人資料
						</MenuLink>
						<MenuLink to="/myFavorite">
							<MenuImage src={like} />
							收藏景點
						</MenuLink>
						<MenuLink to="/myPost">
							<MenuImage src={post} />
							過往PO文
						</MenuLink>
					</MenuBar>

					<Switch>
						<Route exact path="/profile">
							<PersonalData />
						</Route>
						<Route exact path="/myFavorite">
							<PersonalFavorite />
						</Route>
						<Route exact path="/myPost">
							<PersonalPost />
						</Route>
					</Switch>
				</BrowserRouter>
			</Container>
		</MainContainer>
	);
}

export default Profile;
