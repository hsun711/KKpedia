import React, { useEffect, useState } from "react";
import styled from "styled-components";
import firebase from "../utils/firebase";
import Popup from "reactjs-popup";
import { v4 as uuidv4 } from "uuid";
import Map from "./Map";
import LookMore from "./LookMore";
import WriteComment from "./WriteComment";
import coverImage from "../img/wanted.png";
import unlike from "../img/unlike.png";
import like from "../img/like.png";
import leftarrow from "../img/left-arrow.png";
import rightarrow from "../img/right-arrow.png";
import board from "../img/cork-board.png";
import star from "../img/star.png";
import edit from "../img/pencil.png";
import check from "../img/checked.png";
import changeimg from "../img/camera.png";
import { useParams } from "react-router-dom";

const MainContainer = styled.div`
	width: 70%;
	/* height: 100%; */
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
	width: 100%;
	display: flex;
	flex-direction: column;
	background-color: beige;
	padding: 3vmin 5vmin;
`;

const TopDetail = styled.div`
	width: 100%;
	display: flex;
`;

const Photo = styled.div`
	display: flex;
	position: relative;
`;

const MainImage = styled.img`
	width: 20vmin;
	/* height: 20vmin; */
`;

const LocationDetail = styled.div`
	display: flex;
	flex-direction: column;
	padding-left: 3vmin;
`;

const TitleName = styled.path`
	font-size: 4vmin;
	font-weight: 600;
	margin-top: 2vmin;
	margin-bottom: 1vmin;
`;

const EditIcon = styled.img`
	width: 2vmin;
	height: 2vmin;
	cursor: pointer;
	margin-right: 1vmin;
`;

const EditArea = styled.div`
	display: flex;
`;

const Description = styled.input`
	font-size: 2vmin;
	border: none;
	background-color: beige;
	color: grey;
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
	height: 20vmin;
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

const Score = styled.div`
	background-image: url(${star});
	background-repeat: no-repeat;
	background-size: 100%;
	width: 2vmin;
	height: 2vmin;
`;

const ScoreTxt = styled.p`
	font-size: 2vmin;
	font-weight: 600;
	margin-left: 2.3vmin;
`;

const TimeStamp = styled.div`
	font-size: 1vmin;
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

const StyledPopup = styled(Popup)`
	/* use your custom style for ".popup-overlay" */
	&-overlay {
		background: rgba(0, 0, 0, 0.8);
	}
`;

function EachLocation({ title }) {
	const [favorite, setFavorite] = useState(false);
	const [placeData, setPlaceData] = useState([]);
	const [popUpWriteComment, setPopUpWriteComment] = useState(false);
	const [comment, setComment] = useState([]);
	const [readOnly, setReadOnly] = useState(true);
	const [editText, setEditText] = useState("");
	const [photoChange, setPhotoChange] = useState(false);
	const [file, setFile] = useState(null);
	let { location } = useParams();
	const db = firebase.firestore();
	const docRef = db.collection("categories");
	const user = firebase.auth().currentUser;

	const PopUp = () => {
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
			.set({ placeData })
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

	// console.log(title);
	// console.log(placeData);

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
		} else {
			setReadOnly(false);
		}
	};

	return (
		<MainContainer>
			<Container>
				{popUpWriteComment ? (
					<>
						<Cover onClick={PopUp} />
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
									<TitleName>{data.locationName}</TitleName>
									<EditArea>
										<Description
											readOnly={readOnly}
											value={editText}
											onChange={(e) => {
												setEditText(e.target.value);
											}}
										/>
										<EditIcon
											src={readOnly ? edit : check}
											onClick={Editable}
										/>
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
								<Arrow src={leftarrow} />
								{data.images.map((image) => {
									return <Images src={image || coverImage} key={uuidv4()} />;
								})}
								<Arrow src={rightarrow} />
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
								<CommentTxt>
									<Score>
										<ScoreTxt>{data.score}</ScoreTxt>
									</Score>
									<NormalTxt>{data.comment}</NormalTxt>
									<TimeStamp>{new Date(time).toLocaleString()}</TimeStamp>
								</CommentTxt>
							</Comment>
						);
					})}
				</CommentArea>
				<BottomBtn>
					<CheckBtn onClick={PopUp}>評論</CheckBtn>
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
