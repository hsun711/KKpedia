import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import FollowIdol from "./FollowIdol";
import image from "../../img/wanted.png";
import Loading from "../common/Loading";
import { getUserFollow, getUserContribution } from "../../utils/firebaseFunc";

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
	justify-content: flex-start;
	flex-wrap: wrap;
	margin-bottom: 10vmin;
	@media screen and (max-width: 1200px) {
		justify-content: center;
	}
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
	margin: 3vmin;
	@media screen and (max-width: 1200px) {
		width: 30vmin;
		height: 30vmin;
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
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
	@media screen and (max-width: 1200px) {
		font-size: 3vmin;
	}
	@media screen and (max-width: 500px) {
		font-size: 3.5vmin;
	}
`;

function PersonalData({ setActiveItem }) {
	const currentUser = useSelector((state) => state.currentUser);
	const [contribution, setContribution] = useState([]);
	const [follow, setFollow] = useState([]);

	useEffect(() => {
		if (currentUser && currentUser.uid) {
			const unsubscribe = getUserContribution(currentUser.uid, setContribution);
			return () => {
				unsubscribe();
			};
		}
	}, [currentUser]);

	useEffect(() => {
		if (currentUser && currentUser.uid) {
			const unsubscribe = getUserFollow(currentUser.uid, setFollow);
			return () => {
				unsubscribe();
			};
		}
		setActiveItem("/profile");
	}, [currentUser]);

	return (
		<ProfileContainer>
			<TitleText>Follow</TitleText>
			{currentUser ? (
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
			) : (
				<Loading />
			)}

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
