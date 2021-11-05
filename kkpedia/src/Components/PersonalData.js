import React, { useState, useEffect } from "react";
import styled from "styled-components";
import firebase from "../utils/firebase";
import { v4 as uuidv4 } from "uuid";
import FollowIdol from "./FollowIdol";
import image from "../img/wanted.png";
import { Link, Switch, Route, Redirect, useHistory } from "react-router-dom";
import EachLocation from "./EachLocation";

const ProfileContainer = styled.div`
	background-color: #ffeaa7;
	margin-top: 5vmin;
	padding: 4vmin;
`;

const TitleText = styled.p`
	font-size: 2.7vmin;
	font-weight: 600;
	margin-bottom: 1vmin;
`;

const FollowStar = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin-bottom: 5vmin;
	margin-left: 1.5vmin;
`;

const EachFeolowLink = styled.a`
	width: 20vmin;
	text-decoration: none;
	margin-right: 1vmin;
	padding: 1vmin;
	display: flex;
	flex-direction: column;
	align-items: center;
	color: black;
	cursor: pointer;
`;

const PerStar = styled.img`
	width: 7vmin;
	height: 7vmin;
`;

const NormalTxt = styled.p`
	font-size: 2vmin;
	text-align: center;
`;

function PersonalData() {
	const history = useHistory();
	const user = firebase.auth().currentUser;
	const db = firebase.firestore();
	const userId = user.uid;
	const [contribution, setContribution] = useState([]);
	const [follow, setFollow] = useState([]);

	useEffect(() => {
		// collectionGroup 可以跳過第一個 collection 直接到第二個 collection 去篩選指定的東西
		// 就不用在第一個 collection 裡的 doc 裡一個一個篩選
		db.collectionGroup("places")
			.where("uid", "==", `${user.uid}`)
			.onSnapshot((querySnapshot) => {
				const item = [];
				querySnapshot.forEach((doc) => {
					item.push(doc.data());
				});
				setContribution(item);
			});

		db.collection("users")
			.doc(`${userId}`)
			.collection("follows")
			.onSnapshot((querySnapshot) => {
				const item = [];
				querySnapshot.forEach((doc) => {
					item.push(doc.data());
				});
				setFollow(item);
			});
	}, []);

	return (
		<ProfileContainer>
			<TitleText>Follow</TitleText>
			<FollowStar>
				{follow.map((data) => {
					return (
						<FollowIdol
							title={data.title}
							topic={data.topic}
							image={data.main_image}
							key={uuidv4()}
						/>
					);
				})}
			</FollowStar>
			<TitleText>貢獻過 {contribution.length} 個景點</TitleText>
			<FollowStar>
				{contribution.map((item) => {
					return (
						<EachFeolowLink
							href={`/${item.topic}/${item.title}/${item.locationName}`}
							key={uuidv4()}
						>
							<PerStar src={item.images[0] || image} />
							<NormalTxt>{item.title}</NormalTxt>
							<NormalTxt>{item.locationName}</NormalTxt>
						</EachFeolowLink>
					);
				})}
			</FollowStar>
		</ProfileContainer>
	);
}

export default PersonalData;
