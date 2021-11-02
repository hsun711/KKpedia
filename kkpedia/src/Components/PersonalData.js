import React, { useState, useEffect } from "react";
import styled from "styled-components";
import firebase from "../utils/firebase";
import FollowIdol from "./FollowIdol";
import image from "../img/wanted.png";

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

const EachFellow = styled.div`
	margin-right: 1vmin;
	padding: 1vmin;
	display: flex;
	flex-direction: column;
	align-items: center;
	/* outline: 1px solid black; */
`;

const PerStar = styled.img`
	width: 7vmin;
	height: 7vmin;
`;

const EachContribution = styled(EachFellow)`
	display: flex;
	width: 20vmin;
	flex-direction: column;
	align-items: center;
`;

const NormalTxt = styled.p`
	font-size: 2vmin;
	text-align: center;
`;

function PersonalData({ setLevel }) {
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
				setLevel(item.length);
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
					return <FollowIdol title={data.title} image={data.main_image} />;
				})}
			</FollowStar>
			<TitleText>貢獻過 {contribution.length} 個景點</TitleText>
			<FollowStar>
				{contribution.map((item) => {
					return (
						<EachContribution key={item.locationName}>
							<PerStar src={item.main_image || image} />
							<NormalTxt>{item.locationName}</NormalTxt>
						</EachContribution>
					);
				})}
			</FollowStar>
		</ProfileContainer>
	);
}

export default PersonalData;
