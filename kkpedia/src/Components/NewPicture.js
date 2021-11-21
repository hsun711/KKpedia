import React, { useState, useEffect } from "react";
import styled from "styled-components";
import firebase from "../utils/firebase";
import Compressor from "compressorjs";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
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
	margin-top: -40vh;
	padding: 7vmin 5vmin 0vmin;
	display: flex;
	flex-direction: column;
	z-index: 5;
	@media screen and (max-width: 1200px) {
		width: 80vmin;
		margin-left: -40vmin;
	}
`;

const InputTitle = styled.p`
	width: 55vmin;
	font-size: 2.5vmin;
	font-weight: 600;
	@media screen and (max-width: 1200px) {
		width: 100%;
		margin-top: 2vmin;
		font-size: 3vmin;
	}
`;

const InputArea = styled.input`
	border-radius: 5px;
	width: 100%;
	height: 4vmin;
	margin: 2vmin 0px;
	padding-left: 10px;
	font-size: 2vmin;
	@media screen and (max-width: 1200px) {
		height: 5vmin;
	}
`;

const ArtistName = styled.div`
	width: 100%;
	margin-top: 3vmin;
	display: flex;
	align-items: center;
	@media screen and (max-width: 1200px) {
		flex-direction: column;
		align-items: flex-start;
		margin-top: 0vmin;
	}
`;

const ShortTitle = styled(InputTitle)`
	width: 20vmin;
`;

const AddImagesTitle = styled.p`
	width: 15vmin;
	font-size: 2.5vmin;
	font-weight: 600;
	@media screen and (max-width: 1200px) {
		width: 100%;
		font-size: 2vmin;
	}
`;

const Add = styled.div`
	background-image: url(${add});
	background-size: 100%;
	background-repeat: no-repeat;
	width: 5vmin;
	height: 5vmin;
	cursor: pointer;
`;

const MultiImgs = styled.div`
	display: flex;
	max-height: 15vmin;
	flex-wrap: wrap;
	overflow-y: scroll;
`;

const CoverImges = styled.div`
	width: 10vmin;
	height: 10vmin;
	margin: 2vmin;
`;

const CoverImage = styled.img`
	width: 100%;
	height: 100%;
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

function NewPicture({ title, AddPicture }) {
	const db = firebase.firestore();
	const [loading, setLoading] = useState(false);
	const [userName, setUserName] = useState("");
	const [userLevel, setUserLevel] = useState(0);
	const [files, setFiles] = useState([]);
	const user = firebase.auth().currentUser;
	const docRef = db.collection("users").doc(`${user.uid}`);
	const [imgDescription, setImgDescription] = useState("");

	docRef.get().then((doc) => {
		if (doc.exists) {
			setUserName(doc.data().userName);
			// setUserLevel(doc.data().userLevel);
			if (doc.data().userLevel === undefined) {
				setUserLevel(0);
			} else {
				setUserLevel(doc.data().userLevel);
			}
		} else {
			// doc.data() will be undefined in this case
			console.log("No such document!");
		}
	});

	const OnFileChange = (e) => {
		// Get Files
		for (let i = 0; i < e.target.files.length; i++) {
			const newFile = e.target.files[i];
			const fileType = newFile.type.slice(0, 5);
			if (fileType !== "image") {
				Swal.fire("請上傳圖片檔");
				return;
			} else {
				setFiles((prevState) => [...prevState, newFile]);
			}
		}
	};
	const UpdateLevel = () => {
		docRef.update({
			userLevel: userLevel + 7,
		});
	};

	const handleUpload = () => {
		setLoading(true);
		const documentRef = db.collection("categories").doc(`${title}`);
		const promises = [];
		const docid = documentRef.collection("photos").doc().id;

		const data = {
			// postUser: userName,
			uid: user.uid,
			description: imgDescription,
			postTime: new Date().getTime(),
			images: [],
		};
		documentRef
			.collection("photos")
			.doc(`${docid}`)
			.set(data, { merge: true })
			.then((docRef) => {
				UpdateLevel();
			});
		files.map((file) => {
			new Compressor(file, {
				quality: 0.8,
				success: (compressedResult) => {
					const id = uuidv4();
					const uploadTask = firebase
						.storage()
						.ref(`idol_images/${documentRef.id}/${id}`)
						.put(compressedResult);
					promises.push(uploadTask);
					uploadTask.on(
						"state_changed",
						function progress(snapshot) {
							const progress =
								(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
							if (snapshot.state === firebase.storage.TaskState.RUNNING) {
								console.log(`Progress: ${progress}%`);
							}
						},
						function error(error) {
							console.log(error);
						},
						function complete() {
							firebase
								.storage()
								.ref(`idol_images/${documentRef.id}/`)
								.child(`${id}`)
								.getDownloadURL()
								.then((imgUrls) => {
									documentRef
										.collection("photos")
										.doc(`${docid}`)
										.update({
											images: firebase.firestore.FieldValue.arrayUnion(
												`${imgUrls}`
											),
										})
										.then(() => {
											// console.log(user.uid);
										});
								});
						}
					);
				},
			});
		});

		Promise.all(promises)
			.then(() => {
				setLoading(false);
				AddPicture(false);
				Swal.fire("貢獻值加 7 點~");
			})
			.catch((err) => console.log(err));
	};

	return (
		<Container>
			<InputTitle>藝人 / 戲劇 / 綜藝名稱：{title}</InputTitle>
			<ArtistName>
				<ShortTitle>照片簡述：</ShortTitle>
				<InputArea
					value={imgDescription}
					onChange={(e) => {
						setImgDescription(e.target.value);
					}}
				/>
			</ArtistName>
			<ArtistName>
				<AddImagesTitle>上傳照片：</AddImagesTitle>
				<Add as="label" htmlFor="uploadImage" />
				<input
					type="file"
					id="uploadImage"
					multiple
					accept="image/*"
					style={{ display: "none" }}
					onChange={OnFileChange}
				/>
			</ArtistName>
			<MultiImgs>
				{files.map((file) => {
					return (
						<CoverImges key={file.id}>
							<CoverImage src={URL.createObjectURL(file)} />
						</CoverImges>
					);
				})}
			</MultiImgs>
			<SendBtn onClick={handleUpload}>新增</SendBtn>
			{loading && <Loading />}
		</Container>
	);
}

export default NewPicture;
