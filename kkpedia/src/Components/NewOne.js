import React, { useState } from "react";
import styled from "styled-components";
import firebase from "../utils/firebase";
import Swal from "sweetalert2";
import Compressor from "compressorjs";
import add from "../img/addimage.png";
import paper from "../img/rm429-013.png";
import Loading from "./Loading";

const Container = styled.div`
	width: 80vmin;
	background-image: url(${paper});
	background-repeat: no-repeat;
	background-size: 100% 100%;
	position: fixed;
	top: 50%;
	left: 50%;
	margin-left: -40vmin;
	margin-top: -40vh;
	padding: 7vmin 5vmin 0vmin;
	display: flex;
	flex-direction: column;
	z-index: 5;
	@media screen and (max-width: 1200px) {
		width: 90vmin;
		margin-left: -45vmin;
	}
	/* width: 40vw;
	height: 80vh;
	background-image: url(${paper});
	background-repeat: no-repeat;
	background-size: 100% 100%;
	position: fixed;
	top: 50%;
	left: 50%;
	margin-left: -20vw;
	margin-top: -40vh;
	padding: 7vmin 7vmin;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	z-index: 5;
	@media screen and (max-width: 1200px) {
		width: 80vw;
		height: 90vh;
		margin-left: -40vw;
		margin-top: -40vh;
	} */
`;

const InsideContainer = styled.div`
	width: 100%;
	height: 100%;
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
		line-height: 4vmin;
	}
`;

const InputArea = styled.input`
	border-radius: 5px;
	width: 100%;
	height: 4vmin;
	margin: 2vmin 0;
	padding-left: 10px;
	font-size: 2vmin;
	@media screen and (max-width: 1200px) {
		font-size: 1.5vmin;
		height: 5vmin;
	}
`;

const ArtistName = styled.div`
	width: 100%;
	margin-top: 1vmin;
	display: flex;
	align-items: center;
	@media screen and (max-width: 1200px) {
		margin-top: 2vmin;
		flex-direction: column;
		align-items: flex-start;
	}
`;

const ShortTitle = styled(InputTitle)`
	width: 20vmin;
`;

const ArtistImage = styled(ArtistName)`
	@media screen and (max-width: 1200px) {
		flex-direction: row;
		align-items: center;
	}
`;

const ImageTitle = styled(ShortTitle)`
	width: fit-content;
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
	const [title, setTitle] = useState("");
	const [ig, setIg] = useState("");
	const [fb, setFb] = useState("");
	const [twitter, setTwitter] = useState("");
	const [youtube, setYoutube] = useState("");
	const [file, setFile] = useState(null);
	const previewURL = file ? URL.createObjectURL(file) : "";

	const SendNewOn = () => {
		setLoading(true);
		if (title === "") {
			Swal.fire("藝人 / 戲劇 / 綜藝名稱沒有填喔!");
			setLoading(false);
			return;
		}
		if (ig !== "") {
			const snsRegex = /^https\:\/\/www\.instagram\.com\//;
			if (ig.match(snsRegex) === null) {
				Swal.fire(`請輸入正確的 instagram 網址`);
				setLoading(false);
				return;
			}
		}
		if (fb !== "") {
			const snsRegex = /^https\:\/\/www\.facebook\.com/;
			if (fb.match(snsRegex) === null) {
				Swal.fire(`請輸入正確的 facebook 網址`);
				setLoading(false);
				return;
			}
		}
		if (twitter !== "") {
			const snsRegex = /^https\:\/\/twitter\.com\//;
			if (ig.match(snsRegex) === null) {
				Swal.fire(`請輸入正確的 twitter 網址`);
				setLoading(false);
				return;
			}
		}
		if (youtube !== "") {
			const snsRegex = /^https\:\/\/www\.youtube\.com\//;
			if (ig.match(snsRegex) === null) {
				Swal.fire(`請輸入正確的 youtube 網址`);
				setLoading(false);
				return;
			}
		}
		const documentRef = db.collection("categories").doc(`${title}`);
		documentRef.get().then((doc) => {
			if (doc.exists) {
				Swal.fire(`${title}已經存在了喔`);
				setLoading(false);
				return;
			} else {
				// doc.data() will be undefined in this case
				if (file === null) {
					documentRef
						.set(
							{
								topic: topic,
								title: title,
								facebook: fb,
								instagram: ig,
								twitter: twitter,
								youtube: youtube,
								main_image: "",
								main_banner: "",
							},
							{ merge: true }
						)
						.then((docRef) => {
							setLoading(false);
							setPopAddOne(false);
						});
				} else {
					const fileRef = firebase
						.storage()
						.ref("cover_images/" + documentRef.id);
					const metadata = {
						contentType: file.type,
					};
					new Compressor(file, {
						quality: 0.8,
						success: (compressedResult) => {
							// compressedResult has the compressed file.
							// Use the compressed file to upload the images to your server.
							fileRef.put(compressedResult, metadata).then(() => {
								fileRef.getDownloadURL().then((imageUrl) => {
									const mainimage = compressedResult ? imageUrl : "";
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
						},
					});
				}
			}
		});
	};

	return (
		<Container>
			<InsideContainer>
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
				<ArtistImage>
					<ImageTitle>上傳封面圖：</ImageTitle>
					<Add as="label" htmlFor="postImage" />
					<input
						type="file"
						id="postImage"
						style={{ display: "none" }}
						accept="image/*"
						onChange={(e) => {
							if (e.target.files[0].type === undefined) {
								return;
							}
							const fileType = e.target.files[0].type.slice(0, 5);
							if (fileType !== "image") {
								Swal.fire("請上傳圖片檔");
								return;
							} else {
								setFile(e.target.files[0]);
							}
						}}
					/>
					<CoverImage src={previewURL} />
				</ArtistImage>
				<SendBtn onClick={SendNewOn}>新增</SendBtn>
			</InsideContainer>
			{loading && <Loading />}
		</Container>
	);
}

export default NewOne;
