import React, { useEffect, useState } from "react";
import styled from "styled-components";
import firebase from "../utils/firebase";
import Popup from "reactjs-popup";
import ImageCarousel from "./ImageCarousel";
import { v4 as uuidv4 } from "uuid";
import Map from "./Map";
import LookMore from "./LookMore";
import WriteComment from "./WriteComment";
import coverImage from "../img/wanted.png";
import unlike from "../img/unlike.png";
import like from "../img/like.png";
import background from "../img/20800062.png";
import star from "../img/star.png";
import edit from "../img/pencil.png";
import check from "../img/checked.png";
import { useParams } from "react-router-dom";

const MainContainer = styled.div`
	width: 100%;
	background-image: url(${background});
	background-size: 100% 100%;
	background-repeat: no-repeat;
	box-shadow: 10px 10px 30px 5px rgba(0, 0, 0, 0.2);
	@media screen and (max-width: 1200px) {
		width: 90%;
	}
`;

const Container = styled.div`
	width: 90%;
	display: flex;
	flex-direction: column;
	padding: 4vmin;
	margin: 0vmin auto;
`;

const TopDetail = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	@media screen and (max-width: 1200px) {
		flex-direction: column;
	}
`;

const Photo = styled.div`
	width: 50vmin;
	height: 30vmin;
	display: flex;
	justify-content: center;
	position: relative;
	@media screen and (max-width: 1200px) {
		margin: 0 auto;
	}
`;

const MainImage = styled.img`
	max-width: 100%;
	max-height: 100%;
`;

const LocationDetail = styled.div`
	width: 100%;
	max-height: 30vmin;
	display: flex;
	flex-direction: column;
	padding-left: 3vmin;
	justify-content: space-between;
	@media screen and (max-width: 1200px) {
		padding-top: 5vmin;
		max-height: 50vmin;
		padding-left: 0vmin;
	}
`;

const TitleName = styled.p`
	font-size: 5vmin;
	font-weight: 600;
	line-height: 7vmin;
	color: #482307;
	@media screen and (max-width: 1200px) {
		font-size: 6vmin;
		line-height: 10vmin;
	}
`;

const EditIcon = styled.img`
	width: 2vmin;
	height: 2vmin;
	cursor: pointer;
	margin-right: 1vmin;
	margin-top: 0.5vmin;
`;

const EditArea = styled.div`
	display: flex;
	padding-top: 1vmin;
`;

const Description = styled.textarea`
	border: ${(props) => (props.edit ? "none" : "1px solid black")};
	font-size: 2vmin;
	width: 100%;
	height: 10vmin;
	border-radius: 10px;
	color: grey;
	resize: none;
`;

const DescDiv = styled.div`
	width: 100%;
	height: 10vmin;
	color: #57606f;
	font-size: 2vmin;
	@media screen and (max-width: 1200px) {
		font-size: 2vmin;
	}
	@media screen and (max-width: 450px) {
		font-size: 1.2vmin;
	}
`;

const NormalTxt = styled.p`
	font-size: 2.3vmin;
	line-height: 4vmin;
	color: #57606f;
	@media screen and (max-width: 1200px) {
		line-height: 5vmin;
	}
	@media screen and (max-width: 450px) {
		line-height: 6vmin;
	}
`;

const LikeIcon = styled.img`
	width: 4vmin;
	height: 4vmin;
	cursor: pointer;
	@media screen and (max-width: 500px) {
		margin-top: 1.5vmin;
		width: 5vmin;
		height: 5vmin;
	}
`;

const SubTitle = styled.p`
	font-size: 3vmin;
	font-weight: 600;
	margin-top: 4vmin;
	margin-bottom: 1vmin;
	color: #482307;
`;

const PlaceMap = styled.div`
	width: 100%;
	height: 20vmin;
	margin: 1vmin 0px;
`;

const MoreImage = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	margin-top: 7vmin;
	/* outline: 3px solid black; */
`;

const SingleImg = styled.div`
	display: flex;
	width: 20vmin;
	height: 20vmin;
	margin: 3vmin;
	/* outline: 5px solid black; */
`;

const Image = styled.img`
	max-width: 100%;
	height: 100%;
	/* margin: 2vmin; */
`;

const CommentArea = styled.div`
	width: 90%;
	display: flex;
	flex-direction: column;
	margin: 3vmin auto;
`;

const Comment = styled.div`
	padding: 2vmin;
	background-color: rgba(256, 256, 256, 0.7);
	box-shadow: 10px 10px 30px 5px rgba(0, 0, 0, 0.2);
	border-radius: 10px;
	display: flex;
	margin-bottom: 2vmin;
`;

const CommentUser = styled.img`
	width: 4.5vmin;
	height: 4.5vmin;
	border-radius: 50%;
	outline: 1px solid black;
`;

const CommentTxtArea = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

const CommentTxt = styled.div`
	padding: 0px 2vmin;
`;

const Score = styled.div`
	background-image: url(${star});
	background-repeat: no-repeat;
	background-size: 100%;
	width: 2.5vmin;
	height: 2.5vmin;
	margin-bottom: 1vmin;
`;

const ScoreTxt = styled.p`
	font-size: 2.5vmin;
	font-weight: 600;
	margin-left: 3vmin;
`;

const TimeStamp = styled.div`
	font-size: 1.5vmin;
	align-self: flex-end;
`;

const BottomBtn = styled.div`
	display: flex;
	justify-content: space-around;
	margin-top: 3vmin;
`;

const CheckBtn = styled.div`
	background-color: transparent;
	background-image: linear-gradient(to bottom, #fff, #f8eedb);
	border: 0 solid #e5e7eb;
	border-radius: 0.5rem;
	box-sizing: border-box;
	color: #482307;
	column-gap: 1rem;
	cursor: pointer;
	display: flex;
	font-family: ui-sans-serif, system-ui, -apple-system, system-ui, "Segoe UI",
		Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
		"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
	font-size: 2vmin;
	font-weight: 700;
	line-height: 2vmin;
	margin: 0;
	outline: 2px solid transparent;
	padding: 1.3vmin 2.3vmin;
	text-align: center;
	text-transform: none;
	transition: all 0.1s cubic-bezier(0.4, 0, 0.2, 1);
	user-select: none;
	-webkit-user-select: none;
	touch-action: manipulation;
	box-shadow: 6px 8px 10px rgba(81, 41, 10, 0.1),
		0px 2px 2px rgba(81, 41, 10, 0.2);
	&:hover {
		background-color: #f3f4f6;
		box-shadow: 1px 2px 5px rgba(81, 41, 10, 0.15),
			0px 1px 1px rgba(81, 41, 10, 0.15);
		transform: translateY(0.125rem);
	}
	@media screen and (max-width: 1200px) {
		font-size: 1.5vmin;
	}
	@media screen and (max-width: 550px) {
		padding: 2.5vmin 3.2vmin;
	}
`;

const Cover = styled.div`
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	background-color: black;
	opacity: 0.5;
	z-index: 2;
`;

const StyledPopup = styled(Popup)`
	/* use your custom style for ".popup-overlay" */
	&-overlay {
		background: rgba(0, 0, 0, 0.5);
	}
`;

function EachLocation({ title }) {
	const [favorite, setFavorite] = useState(false);
	const [placeData, setPlaceData] = useState([]);
	const [popUpWriteComment, setPopUpWriteComment] = useState(false);
	const [comment, setComment] = useState([]);
	const [readOnly, setReadOnly] = useState(true);
	const [editText, setEditText] = useState("");
	const [collectUser, setCollectUser] = useState([]);
	let { location } = useParams();
	const db = firebase.firestore();
	const docRef = db.collection("categories");
	const user = firebase.auth().currentUser;

	useEffect(() => {
		docRef
			.doc(`${title}`)
			.collection("places")
			.where("locationName", "==", `${location}`)
			.onSnapshot((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					// doc.data() is never undefined for query doc snapshots
					setPlaceData([doc.data()]);
					setEditText(doc.data().description);
				});
			});

		docRef
			.doc(`${title}`)
			.collection("places")
			.where("locationName", "==", `${location}`)
			.where("collectedBy", "array-contains", `${user.uid}`)
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					// doc.data() is never undefined for query doc snapshots
					const collectedBy = doc.data().collectedBy;
					// item.push(collectedBy);
					setCollectUser(collectedBy);
					const favorite = collectedBy.some((item) => {
						const result = item === user.uid;
						return result;
					});
					if (favorite) {
						setFavorite(true);
					} else {
						// doc.data() will be undefined in this case
						setFavorite(false);
					}
				});
			})
			.catch((error) => {
				console.log("Error getting documents: ", error);
			});

		// desc 遞減 | asc 遞增
		docRef
			.doc(`${title}`)
			.collection("reviews")
			.where("locationName", "==", `${location}`)
			.orderBy("timestamp", "desc")
			.limit(3)
			.onSnapshot((querySnapshot) => {
				const item = [];
				querySnapshot.forEach((doc) => {
					// console.log(doc.data());
					item.push(doc.data());
					// setComment([doc.data()]);
				});
				setComment(item);
			});
	}, []);

	const popUp = () => {
		setPopUpWriteComment(!popUpWriteComment);
	};

	// console.log(location);
	// console.log(title);
	const addToUserData = () => {
		const locationName = placeData[0].locationName;
		db.collection("users")
			.doc(`${user.uid}`)
			.collection("likes")
			.doc(`${locationName}`)
			.set(placeData[0])
			.then(() => {
				alert("收藏進口袋聖地囉🎉🎊");
			})
			.catch((error) => {
				console.error("Error adding document: ", error);
			});
	};

	const removeUserData = () => {
		db.collection("users")
			.doc(`${user.uid}`)
			.collection("likes")
			.doc(`${location}`)
			.delete()
			.then(() => {
				alert("移出口袋聖地囉😤😤");
			})
			.catch((error) => {
				console.error("Error removing document: ", error);
			});
	};

	// 按收藏後把使用者 id 加進景點的 collectedBy
	const addToPlaceCollectBy = () => {
		docRef
			.doc(`${title}`)
			.collection("places")
			.doc(`${location}`)
			.update({
				collectedBy: firebase.firestore.FieldValue.arrayUnion(`${user.uid}`),
			})
			.then(() => {
				// console.log(user.uid);
			});
	};
	const removePlaceCollectBy = () => {
		docRef
			.doc(`${title}`)
			.collection("places")
			.doc(`${location}`)
			.update({
				collectedBy: firebase.firestore.FieldValue.arrayRemove(`${user.uid}`),
			})
			.then(() => {
				// console.log(user.uid);
			});
	};

	const AddtoFavorite = () => {
		setFavorite(!favorite);

		if (favorite === true) {
			removePlaceCollectBy();
			removeUserData();
		} else {
			addToUserData();
			addToPlaceCollectBy();
		}
	};

	const Editable = () => {
		if (readOnly === false) {
			setReadOnly(true);
			// console.log(editText);
			docRef
				.doc(`${title}`)
				.collection("places")
				.doc(`${location}`)
				.update({
					description: `${editText}`,
				});
			collectUser.forEach((user) => {
				db.collection("users")
					.doc(`${user}`)
					.collection("likes")
					.doc(`${location}`)
					.update({
						description: `${editText}`,
					});
			});
		} else {
			setReadOnly(false);
		}
	};

	return (
		<MainContainer>
			<Container>
				{popUpWriteComment ? (
					<>
						<Cover onClick={popUp} />
						<WriteComment
							title={title}
							location={location}
							setPopUpWriteComment={setPopUpWriteComment}
						/>
					</>
				) : (
					<></>
				)}
				{placeData.map((data) => {
					return (
						<div key={data.locationName}>
							<TopDetail>
								<Photo>
									<MainImage src={data.images[0] || coverImage} />
								</Photo>

								<LocationDetail>
									<NormalTxt>貢獻者：{data.postUser}</NormalTxt>
									<NormalTxt>{data.title}</NormalTxt>
									<TitleName>{data.locationName}</TitleName>
									<EditArea>
										<EditIcon
											src={readOnly ? edit : check}
											onClick={Editable}
										/>
										{readOnly ? (
											<DescDiv>{editText}</DescDiv>
										) : (
											<Description
												edit={readOnly}
												readOnly={readOnly}
												value={editText}
												onChange={(e) => {
													setEditText(e.target.value);
												}}
											/>
										)}
									</EditArea>
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
								{data.images.length <= 3 ? (
									<>
										{data.images.map((image) => {
											return (
												<SingleImg key={uuidv4()}>
													<Image src={image} />
												</SingleImg>
											);
										})}
									</>
								) : (
									<ImageCarousel images={data.images} showNum={4} />
								)}
							</MoreImage>
						</div>
					);
				})}
				<SubTitle>Review</SubTitle>
				<CommentArea>
					{comment.map((data) => {
						const time = data.timestamp;
						return (
							<Comment key={uuidv4()}>
								<CommentUser src={data.postUserImg || coverImage} />
								<CommentTxtArea>
									<CommentTxt>
										<Score>
											<ScoreTxt>{data.score}</ScoreTxt>
										</Score>
										<NormalTxt>{data.comment}</NormalTxt>
									</CommentTxt>
									<TimeStamp>{new Date(time).toLocaleString()}</TimeStamp>
								</CommentTxtArea>
							</Comment>
						);
					})}
				</CommentArea>
				<BottomBtn>
					<CheckBtn onClick={popUp}>評論</CheckBtn>
					<StyledPopup
						trigger={<CheckBtn>查看更多</CheckBtn>}
						position="center center"
						modal
						closeOnDocumentClick
					>
						<LookMore title={title} location={location} />
					</StyledPopup>
				</BottomBtn>
			</Container>
		</MainContainer>
	);
}

export default EachLocation;
