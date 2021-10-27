import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Map from "./Map";
import mainImage from "../img/wanted.png";
import unlike from "../img/unlike.png";
import like from "../img/like.png";
import leftarrow from "../img/left-arrow.png";
import rightarrow from "../img/right-arrow.png";
import board from "../img/cork-board.png";
import { useParams } from "react-router-dom";

const OusideContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

const MainContainer = styled.div`
	/* width: 70%;
	height: 100%; */
	/* margin: 20vmin auto; */
	margin: 0px auto;
	padding: 5vmin 0px;
	background-image: url(${board});
	display: flex;
	justify-content: center;
	@media screen and (max-width: 992px) {
		margin: 90px auto;
	}
`;

const Container = styled.div`
	/* width: 90%; */
	display: flex;
	flex-direction: column;
	background-color: beige;
	padding: 3vmin 5vmin;
`;

const TopDetail = styled.div`
	width: 100%;
	display: flex;
`;

const MainImage = styled.img`
	width: 20vmin;
	height: 20vmin;
`;

const LocationDetail = styled.div`
	display: flex;
	flex-direction: column;
	padding-left: 3vmin;
`;
const TitleName = styled.p`
	font-size: 4vmin;
	font-weight: 600;
	margin-top: 2vmin;
	margin-bottom: 1vmin;
`;

const NormalTxt = styled.p`
	font-size: 2vmin;
`;

const LikeIcon = styled.img`
	width: 3vmin;
	height: 3vmin;
	margin-top: 1vmin;
	cursor: pointer;
`;

const SubTitle = styled.p`
	font-size: 3vmin;
	font-weight: 600;
	margin-top: 4vmin;
	margin-bottom: 1vmin;
`;

const PlaceMap = styled.div`
	width: 100%;
	height: 50vmin;
	margin: 1vmin 0px;
`;

const MoreImage = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-around;
	align-items: center;
	margin-top: 3vmin;
`;

const Images = styled.img`
	width: 10vmin;
	height: 10vmin;
`;

const Arrow = styled.img`
	width: 7vmin;
	height: 7vmin;
	cursor: pointer;
`;

const CommentArea = styled.div`
	width: 70%;
	display: flex;
	flex-direction: column;
	margin: 0px auto;
`;

const Comment = styled.div`
	padding: 2vmin;
	background-color: #dfe6e9;
	border-radius: 10px;
	display: flex;
	margin-bottom: 2vmin;
`;

const CommentUser = styled.img`
	width: 3vmin;
	height: 3vmin;
	border-radius: 50%;
	outline: 1px solid black;
`;
const CommentTxt = styled.div`
	padding: 0px 2vmin;
	position: relative;
`;

const TimeStamp = styled.p`
	font-size: 1vmin;
	position: absolute;
	bottom: -15px;
	right: 0px;
`;

const BottomBtn = styled.div`
	display: flex;
	justify-content: space-around;
	margin-top: 3vmin;
`;

const CheckBtn = styled.div`
	width: 20vmin;
	height: 5vmin;
	border: 1px solid black;
	border-radius: 8px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #1dd1a1;
	margin-bottom: 30px;
	font-size: 2.6vmin;
	font-weight: 600;
	cursor: pointer;
`;

const Cover = styled.div`
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	background-color: black;
	opacity: 0.8;
	z-index: 2;
`;

function EachLocation({ title }) {
	const [favorite, setFavorite] = useState(false);
	const [wirte, setWrite] = useState(false);
	const [more, setMore] = useState(false);
	let { location } = useParams();
	// const [locationName, setLocationName] = useState(location);
	const AddtoFavorite = () => {
		setFavorite(!favorite);
	};

	const WriteComment = () => {
		setWrite(!wirte);
	};

	const MoreComment = () => {
		setMore(!more);
	};

	console.log(title);

	return (
		<MainContainer>
			<Container>
				<TopDetail>
					<MainImage src={mainImage} />
					<LocationDetail>
						<NormalTxt>UserId</NormalTxt>
						<TitleName>{location}</TitleName>
						<NormalTxt>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eu
							placerat urna, quis tincidunt lectus.
						</NormalTxt>

						<LikeIcon src={favorite ? like : unlike} onClick={AddtoFavorite} />
					</LocationDetail>
				</TopDetail>
				<SubTitle>Location</SubTitle>
				<NormalTxt>韓國首爾特別市龍山區的南山</NormalTxt>
				<PlaceMap>
					<Map />
				</PlaceMap>
				<MoreImage>
					<Arrow src={leftarrow} />
					<Images src={mainImage} />
					<Images src={mainImage} />
					<Images src={mainImage} />
					<Arrow src={rightarrow} />
				</MoreImage>
				<SubTitle>Review</SubTitle>
				<CommentArea>
					<Comment>
						<CommentUser src={mainImage} />
						<CommentTxt>
							<NormalTxt>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eu
								placerat urna, quis tincidunt lectus.
							</NormalTxt>
							<TimeStamp>2021/10/23</TimeStamp>
						</CommentTxt>
					</Comment>
					<Comment>
						<CommentUser src={mainImage} />
						<CommentTxt>
							<NormalTxt>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eu
								placerat urna, quis tincidunt lectus.
							</NormalTxt>
							<TimeStamp>2021/10/23</TimeStamp>
						</CommentTxt>
					</Comment>
				</CommentArea>
				<BottomBtn>
					<CheckBtn onClick={WriteComment}>評論</CheckBtn>
					<CheckBtn onClick={MoreComment}>查看更多</CheckBtn>
				</BottomBtn>
			</Container>
		</MainContainer>
	);
}

export default EachLocation;
