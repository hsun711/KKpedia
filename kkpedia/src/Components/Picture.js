import React, { useState, useEffect } from "react";
import styled from "styled-components";
import firebase from "../utils/firebase";
import NewPicture from "./NewPicture";
import ImageCarousel from "./ImageCarousel";
import { v4 as uuidv4 } from "uuid";

const Container = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	@media screen and (max-width: 1200px) {
		width: 90%;
	}
`;

const Add = styled.div`
	background-color: #f8eedb;
	border: 2px solid #422800;
	border-radius: 30px;
	box-shadow: #422800 4px 4px 0 0;
	color: #422800;
	cursor: pointer;
	position: fixed;
	bottom: 3vmin;
	right: 2vmin;
	display: inline-block;
	font-weight: 600;
	font-size: 2vmin;
	padding: 0 2vmin;
	line-height: 4.2vmin;
	text-align: center;
	text-decoration: none;
	user-select: none;
	-webkit-user-select: none;
	touch-action: manipulation;
	&:hover {
		background-color: #f3f4f6;
		box-shadow: #422800 2px 2px 0 0;
		transform: translate(2px, 2px);
	}
	@media screen and (max-width: 1200px) {
		line-height: 5vmin;
		padding: 0.75vmin 2vmin;
	}
`;

const EachPhoto = styled.div`
	display: flex;
	flex-direction: column;
	background-color: rgba(248, 239, 221, 0.7);
	box-shadow: 10px 10px 30px 5px rgba(0, 0, 0, 0.2);
	padding: 2vmin;
	width: 100%;
	border-radius: 10px;
	margin-bottom: 2vmin;
`;

const PosterInfo = styled.div`
	display: flex;
	justify-content: space-between;
`;

const ImageHolder = styled.p`
	font-size: 4vmin;
	line-height: 5vmin;
	font-weight: 600;
	margin-left: 2.5vmin;
`;

const TimeStamp = styled.div`
	font-size: 1.5vmin;
`;

const ImageDescription = styled.p`
	font-size: 2vmin;
	margin-left: 2.5vmin;
	color: #57606f;
	@media screen and (max-width: 1200px) {
		font-size: 1.75vmin;
	}
`;

const PhotosArea = styled.div`
	width: 100%;
	margin: 0vmin auto;
	@media screen and (max-width: 1200px) {
		margin: 2vmin auto;
	}
`;
const NoCarouselImg = styled.div`
	width: 80%;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-evenly;
	margin: 0vmin auto;
`;

const MultiPhoto = styled.div`
	margin: 3vmin 0vmin 2vmin 10vmin;
	@media screen and (max-width: 1200px) {
		margin: 3vmin 0vmin 0vmin 7vmin;
	}
`;

const Photos = styled.img`
	max-width: 20vmin;
	max-height: 20vmin;
	@media screen and (max-width: 1200px) {
		max-width: 15vmin;
		max-height: 15vmin;
	}
`;

const Cover = styled.div`
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	background-color: black;
	opacity: 0.6;
	z-index: 2;
`;

function Picture({ title }) {
	// let { category } = useParams();
	const db = firebase.firestore();
	const user = firebase.auth().currentUser;
	const [popAddPicture, setPopAddPicture] = useState(false);
	const [photos, setPhotos] = useState([]);
	const [userLevel, setUserLevel] = useState(0);

	const AddPicture = () => {
		setPopAddPicture(!popAddPicture);
	};

	useEffect(() => {
		db.collection("categories")
			.doc(`${title}`)
			.collection("photos")
			.orderBy("postTime", "desc")
			.onSnapshot((querySnapshot) => {
				const item = [];
				querySnapshot.forEach((doc) => {
					// console.log(doc.data());
					item.push(doc.data());
				});
				// console.log(item);
				setPhotos(item);
			});
		db.collection("users")
			.doc(`${user.uid}`)
			.get()
			.then((doc) => {
				setUserLevel(doc.data().userLevel);
			});
	}, []);

	return (
		<>
			{userLevel <= 20 ? (
				<EachPhoto>
					<p>請再加把勁，貢獻聖地解鎖圖片區唷🤪🤪</p>
				</EachPhoto>
			) : (
				<>
					<Add onClick={AddPicture} topic="Idol">
						新增照片
					</Add>
					{popAddPicture ? (
						<>
							<Cover onClick={AddPicture} />
							<NewPicture title={title} AddPicture={AddPicture} />
						</>
					) : (
						<Container>
							{photos.map((item) => {
								return (
									<EachPhoto key={uuidv4()}>
										<PosterInfo>
											<ImageHolder>{item.postUser}</ImageHolder>
											<TimeStamp>
												{new Date(item.postTime).toLocaleString()}
											</TimeStamp>
										</PosterInfo>
										<ImageDescription>{item.description}</ImageDescription>
										<PhotosArea>
											{item.images.length <= 4 ? (
												<NoCarouselImg>
													{item.images.map((img) => {
														return <Photos src={img} key={uuidv4()} />;
													})}
												</NoCarouselImg>
											) : (
												<MultiPhoto>
													<ImageCarousel images={item.images} showNum={4} />
												</MultiPhoto>
											)}
										</PhotosArea>
									</EachPhoto>
								);
							})}
						</Container>
					)}
				</>
			)}
		</>
	);
}

export default Picture;
