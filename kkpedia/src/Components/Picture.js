import React, { useState, useEffect } from "react";
import styled from "styled-components";
import firebase from "../utils/firebase";
import NewPicture from "./NewPicture";
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
	width: 100%;
	margin-left: 0.5vmin;
`;
const Photos = styled.img`
	width: 10vmin;
	height: 10vmin;
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
	const [popAddPicture, setPopAddPicture] = useState(false);
	const [photos, setPhotos] = useState([]);
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
					{photos.map((item) => {
						{
							/* console.log(item); */
						}
						return (
							<EachPhoto>
								<ImageHolder>{item.postUser}</ImageHolder>
								<ImageDescription>{item.description}</ImageDescription>
								<PhotosArea>
									{item.images.map((img) => {
										return <Photos src={img} />;
									})}
								</PhotosArea>
							</EachPhoto>
						);
					})}
				</Container>
			)}
		</>
	);
}

export default Picture;
