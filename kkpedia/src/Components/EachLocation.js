import React, { useEffect, useState } from "react";
import styled from "styled-components";
import firebase from "../utils/firebase";
import Popup from "reactjs-popup";
import Map from "./Map";
import LookMore from "./LookMore";
import WriteComment from "./WriteComment";
import mainImage from "../img/wanted.png";
import unlike from "../img/unlike.png";
import like from "../img/like.png";
import leftarrow from "../img/left-arrow.png";
import rightarrow from "../img/right-arrow.png";
import board from "../img/cork-board.png";
import { useParams } from "react-router-dom";

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

const StyledPopup = styled(Popup)`
	/* use your custom style for ".popup-overlay" */
	&-overlay {
		background: rgba(0, 0, 0, 0.8);
	}
	/* use your custom style for ".popup-content" */
	/* &-content {
		margin: auto;
		width: 700px;
		display: flex;
		height: 550px;
	} */
`;

function EachLocation({ title }) {
	const [favorite, setFavorite] = useState(false);
	const [placeData, setPlaceData] = useState([]);

	let { location } = useParams();
	const db = firebase.firestore();
	const docRef = db.collection("categories");
	const user = firebase.auth().currentUser;

	// const [locationName, setLocationName] = useState(location);
	const AddtoFavorite = () => {
		setFavorite(!favorite);
		console.log(placeData);
		const locationName = placeData[0].locationName;

		db.collection("users")
			.doc(`${user.uid}`)
			.collection("likes")
			.doc(`${locationName}`)
			.set({ placeData })
			.then(() => {
				alert("收藏進口袋聖地囉🎉🎊");
			})
			.catch((error) => {
				console.error("Error adding document: ", error);
			});
	};

	useEffect(() => {
		docRef
			.doc(`${title}`)
			.collection("places")
			.where("locationName", "==", `${location}`)
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					// doc.data() is never undefined for query doc snapshots
					// console.log(doc.data());
					setPlaceData([doc.data()]);
				});
			})
			.catch((error) => {
				console.log("Error getting documents: ", error);
			});
	}, []);

	// console.log(title);
	// console.log(placeData);

	return (
		<MainContainer>
			<Container>
				{placeData.map((data) => {
					return (
						<div key={data.locationName}>
							<TopDetail>
								<MainImage src={mainImage} />
								<LocationDetail>
									<NormalTxt>{data.postUser}</NormalTxt>
									<TitleName>{data.locationName}</TitleName>
									<NormalTxt>{data.description}</NormalTxt>

									<LikeIcon
										src={favorite ? like : unlike}
										onClick={AddtoFavorite}
									/>
								</LocationDetail>
							</TopDetail>
							<SubTitle>Location</SubTitle>
							<NormalTxt>{data.address}</NormalTxt>
							<PlaceMap>
								<Map latitude={data.latitude} placeId={data.placeId} />
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
											Lorem ipsum dolor sit amet, consectetur adipiscing elit.
											In eu placerat urna, quis tincidunt lectus.
										</NormalTxt>
										<TimeStamp>2021/10/23</TimeStamp>
									</CommentTxt>
								</Comment>
								<Comment>
									<CommentUser src={mainImage} />
									<CommentTxt>
										<NormalTxt>
											Lorem ipsum dolor sit amet, consectetur adipiscing elit.
											In eu placerat urna, quis tincidunt lectus.
										</NormalTxt>
										<TimeStamp>2021/10/23</TimeStamp>
									</CommentTxt>
								</Comment>
							</CommentArea>
							<BottomBtn>
								<StyledPopup
									trigger={<CheckBtn>評論</CheckBtn>}
									position="center center"
									modal
									closeOnDocumentClick
								>
									<WriteComment />
								</StyledPopup>
								<StyledPopup
									trigger={<CheckBtn>查看更多</CheckBtn>}
									position="center center"
									modal
									closeOnDocumentClick
								>
									<LookMore />
								</StyledPopup>
							</BottomBtn>
						</div>
					);
				})}
			</Container>
		</MainContainer>
	);
}

export default EachLocation;
