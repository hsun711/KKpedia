import React, { useState, useEffect } from "react";
import styled from "styled-components";
import firebase from "../utils/firebase";
import NewPicture from "./NewPicture";
import ImageCarousel from "./ImageCarousel";
import { v4 as uuidv4 } from "uuid";
import add from "../img/plus.png";

const Container = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

const Add = styled.div`
	background-image: url(${add});
	background-repeat: no-repeat;
	background-size: 100%;
	width: 7vmin;
	height: 7vmin;
	position: fixed;
	bottom: 3vmin;
	right: 3vmin;
	cursor: pointer;
`;

const EachPhoto = styled.div`
	display: flex;
	flex-direction: column;
	background-color: beige;
	padding: 10px;
	width: 100%;
	border-radius: 10px;
	margin-bottom: 2vmin;
`;

const ImageHolder = styled.p`
	font-size: 3vmin;
`;

const ImageDescription = styled.p`
	font-size: 2vmin;
	margin-left: 2.5vmin;
`;

const PhotosArea = styled.div`
	width: 90%;
	margin: 0vmin auto;
	/* margin-left: 0.5vmin; */
`;
const NoCarouselImg = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
`;

const Photos = styled.img`
	max-width: 20vmin;
	max-height: 20vmin;
	margin: 2vmin;
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
			<Add onClick={AddPicture} topic="Idol" />
			{popAddPicture ? (
				<div>
					<Cover onClick={AddPicture} />
					<NewPicture title={title} AddPicture={AddPicture} />
				</div>
			) : (
				<Container>
					{userLevel <= 20 ? (
						<EachPhoto>
							<p>請再加把勁，貢獻聖地解鎖圖片區唷🤪🤪</p>
						</EachPhoto>
					) : (
						<>
							{photos.map((item) => {
								return (
									<EachPhoto key={uuidv4()}>
										<ImageHolder>{item.postUser}</ImageHolder>
										<ImageDescription>{item.description}</ImageDescription>
										<PhotosArea>
											{item.images.length < 4 ? (
												<NoCarouselImg>
													{item.images.map((img) => {
														return <Photos src={img} key={uuidv4()} />;
													})}
												</NoCarouselImg>
											) : (
												<ImageCarousel images={item.images} showNum={4} />
											)}
										</PhotosArea>
									</EachPhoto>
								);
							})}
						</>
					)}
				</Container>
			)}
		</>
	);
}

export default Picture;
