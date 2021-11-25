import React, { useEffect, useState, useCallback } from "react";
import firebase from "../../utils/firebase";
import { v4 as uuidv4 } from "uuid";
import Map from "../map/Map";
import LookMore from "./LookMore";
import ImageViewer from "react-simple-image-viewer";
import WriteComment from "./WriteComment";
import PageNotFound from "../common/PageNotFound";
import coverImage from "../../img/wanted.png";
import unlike from "../../img/unlike.png";
import like from "../../img/like.png";
import edit from "../../img/pencil.png";
import check from "../../img/checked.png";
import Loading from "../common/Loading";
import { useParams } from "react-router-dom";
import {
	addToPlaceCollectBy,
	removePlaceCollectBy,
	removeUserLikes,
	addToUserLikes,
} from "../../utils/firebaseFunc";
import {
	MainContainer,
	Container,
	TopDetail,
	Photo,
	MainImage,
	LocationDetail,
	TitleName,
	EditIcon,
	EditArea,
	Description,
	DescDiv,
	NormalTxt,
	LikeIcon,
	SubTitle,
	PlaceMap,
	MoreImage,
	SingleImg,
	Image,
	CommentArea,
	Comment,
	CommentUser,
	CommentTxtArea,
	CommentTxt,
	Score,
	ScoreTxt,
	TimeStamp,
	BottomBtn,
	CheckBtn,
	Cover,
	StyledPopup,
} from "../../style/eachLocation";

function EachLocation({ title, setActiveItem }) {
	const [favorite, setFavorite] = useState(false);
	const [placeData, setPlaceData] = useState();
	const [popUpWriteComment, setPopUpWriteComment] = useState(false);
	const [comment, setComment] = useState([]);
	const [readOnly, setReadOnly] = useState(true);
	const [editText, setEditText] = useState("");
	const [posterName, setPosterName] = useState("");
	const [collectUser, setCollectUser] = useState([]);
	let { location } = useParams();
	const db = firebase.firestore();
	const docRef = db.collection("categories");
	const user = firebase.auth().currentUser;
	const [currentImage, setCurrentImage] = useState(0);
	const [isViewerOpen, setIsViewerOpen] = useState(false);

	useEffect(() => {
		setActiveItem("idolplace");
		const unsubscribe = docRef
			.doc(`${title}`)
			.collection("places")
			.where("locationName", "==", `${location}`)
			.onSnapshot((querySnapshot) => {
				if (querySnapshot.docs.length > 0) {
					querySnapshot.forEach((doc) => {
						setPlaceData([doc.data()]);
						setEditText(doc.data().description);

						db.collection("users")
							.doc(`${doc.data().uid}`)
							.get()
							.then((doc) => {
								setPosterName(doc.data().userName);
							});
					});
				} else {
					setPlaceData([]);
				}
			});

		docRef
			.doc(`${title}`)
			.collection("places")
			.where("locationName", "==", `${location}`)
			.where("collectedBy", "array-contains", `${user.uid}`)
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					const collectedBy = doc.data().collectedBy;
					setCollectUser(collectedBy);
					const favorite = collectedBy.some((item) => {
						const result = item === user.uid;
						return result;
					});
					if (favorite) {
						setFavorite(true);
					} else {
						setFavorite(false);
					}
				});
			})
			.catch((error) => {
				console.log("Error getting documents: ", error);
			});
		return () => unsubscribe();
	}, []);

	useEffect(() => {
		const unsubscribe = docRef
			.doc(`${title}`)
			.collection("reviews")
			.where("locationName", "==", `${location}`)
			.orderBy("timestamp", "desc") // desc 遞減 | asc 遞增
			.limit(3)
			.onSnapshot((querySnapshot) => {
				const item = [];
				querySnapshot.forEach((doc) => {
					item.push(doc.data());
				});
				setComment(item);
			});
		return () => unsubscribe();
	}, []);

	const popUp = () => {
		setPopUpWriteComment(!popUpWriteComment);
	};

	const AddtoFavorite = () => {
		setFavorite(!favorite);
		if (favorite === true) {
			removePlaceCollectBy(title, location, user.uid);
			removeUserLikes(user.uid, location);
		} else {
			addToUserLikes(user.uid, placeData);
			addToPlaceCollectBy(title, location, user.uid);
		}
	};

	const Editable = () => {
		if (readOnly === false) {
			setReadOnly(true);
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

	const openImageViewer = useCallback((index) => {
		setCurrentImage(index);
		setIsViewerOpen(true);
	}, []);

	const closeImageViewer = () => {
		setCurrentImage(0);
		setIsViewerOpen(false);
	};

	return (
		<>
			{placeData ? (
				placeData.length === 0 ? (
					<PageNotFound />
				) : (
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
							) : null}

							{placeData.map((data) => {
								return (
									<div key={data.locationName}>
										<TopDetail>
											<Photo>
												<MainImage src={data.images[0] || coverImage} />
											</Photo>

											<LocationDetail>
												<NormalTxt>貢獻者：{posterName}</NormalTxt>
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
											{data.images.map((image, index) => {
												return (
													<SingleImg key={uuidv4()}>
														<Image
															src={image}
															key={index}
															onClick={() => openImageViewer(index)}
														/>
														{isViewerOpen && (
															<ImageViewer
																src={data.images}
																currentIndex={currentImage}
																onClose={closeImageViewer}
																disableScroll={false}
																backgroundStyle={{
																	backgroundColor: "rgba(0,0,0,0.9)",
																}}
																closeOnClickOutside={true}
															/>
														)}
													</SingleImg>
												);
											})}
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
				)
			) : (
				<Loading />
			)}
		</>
	);
}
export default EachLocation;
