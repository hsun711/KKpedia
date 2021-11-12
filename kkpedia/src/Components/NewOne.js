import React, { useState } from "react";
import styled from "styled-components";
import firebase from "../utils/firebase";
import add from "../img/addimage.png";
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
	padding: 10vmin 7vmin 0vmin;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	z-index: 5;
	@media screen and (max-width: 1200px) {
		margin-top: -55vmin;
	}
`;

const InputTitle = styled.p`
	width: 55vmin;
	font-size: 2.5vmin;
	line-height: 4vmin;
	font-weight: 600;
	@media screen and (max-width: 1200px) {
		font-size: 3vmin;
		line-height: 3vmin;
	}
`;

const LongTitle = styled(InputTitle)`
	@media screen and (max-width: 520px) {
		width: 100vmin;
		font-size: 1vmin;
		line-height: 4vmin;
	}
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
	margin-top: 1vmin;
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
	width: 100%;
	margin: 5vmin auto;
	background-color: transparent;
	background-image: linear-gradient(to bottom, #9c8879, #482307);
	border: 0 solid #e5e7eb;
	border-radius: 0.5rem;
	box-sizing: border-box;
	color: #f8eedb;
	column-gap: 1rem;
	cursor: pointer;
	display: flex;
	justify-content: center;
	font-size: 2.5vmin;
	font-weight: 700;
	line-height: 2vmin;
	outline: 2px solid transparent;
	padding: 1.3vmin 2.3vmin;
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

	@media screen and (max-width: 550px) {
		padding: 2.5vmin 3.2vmin;
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
	const previewURL = file ? URL.createObjectURL(file) : "";

	const SendNewOn = () => {
		setLoading(true);
		const documentRef = db.collection("categories").doc(`${title}`);
		const fileRef = firebase.storage().ref("cover_images/" + documentRef.id);
		const metadata = {
			contentType: file.type,
		};

		fileRef.put(file, metadata).then(() => {
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
				<LongTitle>藝人 / 戲劇 / 綜藝名稱：</LongTitle>
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
			<SendBtn onClick={SendNewOn}>新增</SendBtn>
			{loading && <Loading />}
		</Container>
	);
}

export default NewOne;
