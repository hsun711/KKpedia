import React, { useState } from "react";
import firebase from "../../utils/firebase";
import Swal from "sweetalert2";
import Compressor from "compressorjs";
import Loading from "../common/Loading";
import {
	Container,
	InsideContainer,
	InputTitle,
	LongTitle,
	InputArea,
	ArtistName,
	ShortTitle,
	ArtistImage,
	ImageTitle,
	Add,
	CoverImage,
	SendBtn,
} from "../../style/newOne";

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

	const uploadImage = (e) => {
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
	};

	const SendNewOn = () => {
		setLoading(true);
		if (title === "") {
			Swal.fire("藝人 / 戲劇 / 綜藝名稱沒有填喔!");
			setLoading(false);
			return;
		}
		if (ig !== "") {
			const snsRegex = /^https:\/\/www\.instagram\.com\//;
			if (ig.match(snsRegex) === null) {
				Swal.fire(`請輸入正確的 instagram 網址`);
				setLoading(false);
				return;
			}
		}
		if (fb !== "") {
			const snsRegex = /^https:\/\/www\.facebook\.com/;
			if (fb.match(snsRegex) === null) {
				Swal.fire(`請輸入正確的 facebook 網址`);
				setLoading(false);
				return;
			}
		}
		if (twitter !== "") {
			const snsRegex = /^https:\/\/twitter\.com\//;
			if (ig.match(snsRegex) === null) {
				Swal.fire(`請輸入正確的 twitter 網址`);
				setLoading(false);
				return;
			}
		}
		if (youtube !== "") {
			const snsRegex = /^https:\/\/www\.youtube\.com\//;
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
						onChange={uploadImage}
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
