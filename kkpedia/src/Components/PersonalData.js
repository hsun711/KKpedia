import React, { useState } from "react";
import styled from "styled-components";
import image from "../img/wanted.png";
import unlike from "../img/unlike.png";
import like from "../img/like.png";

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
	margin-right: 2vmin;
`;

const PerStar = styled.img`
	width: 7vmin;
	height: 7vmin;
`;

const LikeIcon = styled.img`
	width: 2vmin;
	height: 2vmin;
	margin-top: 1vmin;
	cursor: pointer;
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
	const [favorite, setFavorite] = useState(true);
	const [contribution, setContribution] = useState("2");
	const [donatePlace, setDonatePlace] = useState("南山塔");
	const AddtoFavorite = () => {
		setFavorite(!favorite);
	};

	return (
		<ProfileContainer>
			<TitleText>Fellow</TitleText>
			<FellowStar>
				<EachFellow>
					<PerStar src={image} />
					<LikeIcon src={favorite ? like : unlike} onClick={AddtoFavorite} />
				</EachFellow>
				<EachFellow>
					<PerStar src={image} />
					<LikeIcon src={favorite ? like : unlike} onClick={AddtoFavorite} />
				</EachFellow>
				<EachFellow>
					<PerStar src={image} />
					<LikeIcon src={favorite ? like : unlike} onClick={AddtoFavorite} />
				</EachFellow>
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
