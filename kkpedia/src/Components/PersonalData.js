import React, { useState, useEffect } from "react";
import styled from "styled-components";
import firebase from "../utils/firebase";
import { v4 as uuidv4 } from "uuid";
import FollowIdol from "./FollowIdol";
import image from "../img/wanted.png";

const ProfileContainer = styled.div`
	margin-top: 5vmin;
	padding: 4vmin;
`;

const TitleText = styled.p`
	font-size: 4vmin;
	font-weight: 600;
	margin-bottom: 1vmin;
`;

const FollowStar = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-evenly;
	flex-wrap: wrap;
	padding: 2vmin;
	margin-bottom: 10vmin;
`;

const EachFeolowLink = styled.a`
	background-color: rgba(256, 256, 256, 0.7);
	border-radius: 10px;
	box-shadow: 10px 10px 30px 5px rgba(0, 0, 0, 0.2);
	width: 23vmin;
	height: 24vmin;
	text-decoration: none;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	@media screen and (max-width: 1200px) {
		width: 35vmin;
		height: 40vmin;
		margin: 2vmin;
	}
`;

const StarImage = styled.div`
	width: 100%;
	height: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	border-radius: 10px 10px 0 0;
`;

const PerStar = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;

const StarDetail = styled.div`
	width: 90%;
	height: 50%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const NormalTxt = styled.p`
	font-size: 2.2vmin;
	font-weight: 600;
	margin-bottom: 1vmin;
	color: #1e272e;
	@media screen and (max-width: 1200px) {
		font-size: 3vmin;
	}
	@media screen and (max-width: 500px) {
		font-size: 1vmin;
	}
`;

function PersonalData() {
	const user = firebase.auth().currentUser;
	const db = firebase.firestore();
	const userId = user.uid;
	const [contribution, setContribution] = useState([]);
	const [follow, setFollow] = useState([]);

	useEffect(() => {
		// collectionGroup 可以跳過第一個 collection 直接到第二個 collection 去篩選指定的東西
		// 就不用在第一個 collection 裡的 doc 裡一個一個篩選
		const unsubscribe = db
			.collectionGroup("places")
			.where("uid", "==", `${user.uid}`)
			.onSnapshot((querySnapshot) => {
				const item = [];
				querySnapshot.forEach((doc) => {
					item.push(doc.data());
				});
				setContribution(item);
			});

		return () => unsubscribe();
	}, []);

	useEffect(() => {
		const unsubscribe = db
			.collection("users")
			.doc(`${userId}`)
			.collection("follows")
			.onSnapshot((querySnapshot) => {
				const item = [];
				querySnapshot.forEach((doc) => {
					item.push(doc.data());
				});
				setFollow(item);
			});
		return () => unsubscribe();
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
							target="_blank"
							key={uuidv4()}
						>
							<StarImage>
								<PerStar src={item.images[0] || image} />
							</StarImage>
							<StarDetail>
								<NormalTxt>{item.title}</NormalTxt>
								<NormalTxt>{item.locationName}</NormalTxt>
							</StarDetail>
						</EachFeolowLink>
					);
				})}
			</FollowStar>
		</ProfileContainer>
	);
}

export default PersonalData;
