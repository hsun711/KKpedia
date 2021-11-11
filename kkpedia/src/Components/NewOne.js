import React, { useState } from "react";
import styled from "styled-components";
import firebase from "../utils/firebase";
import add from "../img/plus.png";
import send from "../img/submit.png";
import cover from "../img/wanted.png";
import paper from "../img/rm429-013.png";
import Loading from "./Loading";

const Container = styled.div`
	width: 70vmin;
	background-image: url(${paper});
	background-repeat: no-repeat;
	background-size: 100% 100%;
	position: fixed;
	top: 50%;
	left: 50%;
	margin-left: -35vmin;
	margin-top: -44vmin;
	padding: 10vmin 7vmin 5vmin;
	display: flex;
	flex-direction: column;
	z-index: 5;
	@media screen and (max-width: 1200px) {
		margin-top: -55vmin;
	}
`;

const InputTitle = styled.p`
	width: 55vmin;
	font-size: 2.5vmin;
	font-weight: 600;
`;

const InputArea = styled.input`
	border-radius: 5px;
	width: 100%;
	height: 4vmin;
	margin: 15px 0px;
	padding-left: 10px;
	font-size: 2vmin;
	@media screen and (max-width: 1200px) {
		font-size: 1.5vmin;
	}
`;

const ArtistName = styled.div`
	width: 100%;
	margin-top: 2vmin;
	display: flex;
	align-items: center;
	@media screen and (max-width: 1200px) {
		margin-top: 1vmin;
	}
`;

const ShortTitle = styled(InputTitle)`
	width: 20vmin;
`;

const Add = styled.button`
	background-image: url(${add});
	background-size: 100%;
	background-repeat: no-repeat;
	width: 5vmin;
	height: 5vmin;
	cursor: pointer;
`;

const CoverImage = styled.img`
	width: 10vmin;
	margin-left: 3vmin;
`;

const SendBtn = styled.div`
	background-image: url(${send});
	background-size: 95%;
	background-repeat: no-repeat;
	width: 10vmin;
	height: 8vmin;
	margin-left: 45vmin;
	cursor: pointer;
	&:hover {
		background-position-x: 2px;
		background-position-y: 2px;
	}
`;

function NewOne({ topic, setPopAddOne }) {
	const db = firebase.firestore();
	const [loading, setLoading] = useState(false);
	const [title, setTitle] = useState();
	const [ig, setIg] = useState("");
	const [fb, setFb] = useState("");
	const [twitter, setTwitter] = useState("");
	const [youtube, setYoutube] = useState("");
	const [file, setFile] = useState(null);

	const previewURL = file ? URL.createObjectURL(file) : `${cover}`;

	const SendNewOn = () => {
		setLoading(true);
		const documentRef = db.collection("categories").doc(`${title}`);
		const fileRef = firebase.storage().ref("cover_images/" + documentRef.id);
		// const metadata = {
		// 	contentType: file.type,
		// };

		fileRef.put(file).then(() => {
			fileRef.getDownloadURL().then((imageUrl) => {
				const mainimage = file ? imageUrl : "";
				documentRef
					.set(
						{
							topic: topic,
							title: title,
							facebook: fb,
							instagram: ig,
							twitter: twitter,
							youtube: youtube,
							main_image: mainimage,
							main_banner: "",
						},
						{ merge: true }
					)
					.then((docRef) => {
						setLoading(false);
						setPopAddOne(false);
					});
			});
		});
	};

	return (
		<Container>
			<InputTitle>類別：{topic}</InputTitle>
			<ArtistName>
				<InputTitle>藝人 / 戲劇 / 綜藝名稱：</InputTitle>
				<InputArea
					value={title}
					onChange={(e) => {
						setTitle(e.target.value);
					}}
				/>
			</ArtistName>
			<ArtistName>
				<ShortTitle>instagram：</ShortTitle>
				<InputArea
					value={ig}
					onChange={(e) => {
						setIg(e.target.value);
					}}
				/>
			</ArtistName>
			<ArtistName>
				<ShortTitle>facebook：</ShortTitle>
				<InputArea
					value={fb}
					onChange={(e) => {
						setFb(e.target.value);
					}}
				/>
			</ArtistName>
			<ArtistName>
				<ShortTitle>twitter：</ShortTitle>
				<InputArea
					value={twitter}
					onChange={(e) => {
						setTwitter(e.target.value);
					}}
				/>
			</ArtistName>
			<ArtistName>
				<ShortTitle>youtube：</ShortTitle>
				<InputArea
					value={youtube}
					onChange={(e) => {
						setYoutube(e.target.value);
					}}
				/>
			</ArtistName>
			<ArtistName>
				<ShortTitle>上傳封面圖：</ShortTitle>
				<Add as="label" htmlFor="postImage" />
				<input
					type="file"
					id="postImage"
					style={{ display: "none" }}
					onChange={(e) => {
						setFile(e.target.files[0]);
					}}
				/>
				<CoverImage src={previewURL} />
			</ArtistName>
			<SendBtn onClick={SendNewOn} />
			{loading && <Loading />}
		</Container>
	);
}

export default NewOne;
