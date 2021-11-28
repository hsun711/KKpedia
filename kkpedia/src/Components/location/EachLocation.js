import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
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
import EachComment from "./EachComment";
import { useParams } from "react-router-dom";
import {
	addToPlaceCollectBy,
	removePlaceCollectBy,
	removeUserLikes,
	addToUserLikes,
	editPlaceDescription,
	getPlaceCollectBy,
	getAllReviews,
	snapshopEachPlace,
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
	BottomBtn,
	CheckBtn,
	Cover,
	StyledPopup,
} from "../../style/eachLocation";

function EachLocation({ title, setActiveItem }) {
	const currentUser = useSelector((state) => state.currentUser);
	const [favorite, setFavorite] = useState(false);
	const [placeData, setPlaceData] = useState();
	const [popUpWriteComment, setPopUpWriteComment] = useState(false);
	const [comment, setComment] = useState([]);
	const [readOnly, setReadOnly] = useState(true);
	const [editText, setEditText] = useState("");
	const [posterName, setPosterName] = useState("");
	const [collectUser, setCollectUser] = useState([]);
	let { location } = useParams();
	const [currentImage, setCurrentImage] = useState(0);
	const [isViewerOpen, setIsViewerOpen] = useState(false);

	useEffect(() => {
		setActiveItem("idolplace");
		const unsubscribe = snapshopEachPlace(
			title,
			location,
			setPlaceData,
			setEditText,
			setPosterName
		);

		getPlaceCollectBy(title, location, currentUser.uid).then(
			(querySnapshot) => {
				querySnapshot.forEach((doc) => {
					const collectedBy = doc.data().collectedBy;
					setCollectUser(collectedBy);
					const favorite = collectedBy.some((item) => {
						const result = item === currentUser.uid;
						return result;
					});
					if (favorite) {
						setFavorite(true);
					} else {
						setFavorite(false);
					}
				});
			}
		);

		return () => {
			unsubscribe();
		};
	}, []);

	useEffect(() => {
		const unsubscribe = getAllReviews(title, location, setComment);
		return () => {
			unsubscribe();
		};
	}, []);

	const popUp = () => {
		setPopUpWriteComment(!popUpWriteComment);
	};

	const AddtoFavorite = () => {
		setFavorite(!favorite);
		if (favorite === true) {
			removePlaceCollectBy(title, location, currentUser.uid);
			removeUserLikes(currentUser.uid, location);
		} else {
			addToUserLikes(currentUser.uid, placeData);
			addToPlaceCollectBy(title, location, currentUser.uid);
		}
	};

	const Editable = () => {
		if (readOnly === false) {
			setReadOnly(true);
			editPlaceDescription("categories", title, "places", location, editText);

			collectUser.forEach((user) => {
				editPlaceDescription("users", user, "likes", location, editText);
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
														<DescDiv>{placeData[0].description}</DescDiv>
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
								{comment.slice(0, 3).map((data) => {
									return <EachComment data={data} key={data.docid} />;
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
