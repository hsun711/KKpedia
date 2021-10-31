import React, { useState, useEffect } from "react";
import styled from "styled-components";
import firebase from "../utils/firebase";
import FellowIdol from "./FellowIdol";
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

const FellowStar = styled.div`
	display: flex;
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
	flex-direction: column;
	align-items: center;
`;

const NormalTxt = styled.p`
	font-size: 2vmin;
`;

function PersonalData() {
	const user = firebase.auth().currentUser;
	const db = firebase.firestore();
	const userId = user.uid;
	const [contribution, setContribution] = useState("2");
	const [donatePlace, setDonatePlace] = useState("南山塔");

	return (
		<ProfileContainer>
			<TitleText>Fellow</TitleText>
			<FellowStar>
				<FellowIdol />
				<FellowIdol />
			</FellowStar>
			<TitleText>貢獻過 {contribution} 個景點</TitleText>
			<FellowStar>
				<EachContribution>
					<PerStar src={image} />
					<NormalTxt>{donatePlace}</NormalTxt>
				</EachContribution>
				<EachContribution>
					<PerStar src={image} />
					<NormalTxt>{donatePlace}</NormalTxt>
				</EachContribution>
			</FellowStar>
		</ProfileContainer>
	);
}

export default PersonalData;
