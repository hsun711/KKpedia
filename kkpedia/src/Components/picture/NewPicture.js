import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import firebase from "../../utils/firebase";
import Compressor from "compressorjs";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import Loading from "../common/Loading";
import {
	Container,
	InputArea,
	ShortTitle,
	ArtistName,
	MultiImgs,
	CoverImges,
	Image,
	SendBtn,
	Add,
} from "../../style/newOne";

import { getUserData } from "../../utils/firebaseFunc";

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

const InputInfo = styled(ArtistName)`
	margin-top: 3vmin;
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

function NewPicture({ title, AddPicture }) {
	const db = firebase.firestore();
	const currentUser = useSelector((state) => state.currentUser);
	const [loading, setLoading] = useState(false);
	const [userLevel, setUserLevel] = useState(0);
	const [files, setFiles] = useState([]);
	const user = firebase.auth().currentUser;
	const docRef = db.collection("users").doc(`${user.uid}`);
	const [imgDescription, setImgDescription] = useState("");

	useEffect(() => {
		if (currentUser && currentUser.uid) {
			getUserData(currentUser.uid).then((doc) => {
				if (doc.data().userLevel === undefined) {
					setUserLevel(0);
				} else {
					setUserLevel(doc.data().userLevel);
				}
			});
		}
	}, [currentUser]);

	const OnFileChange = (e) => {
		// Get Files
		for (let i = 0; i < e.target.files.length; i++) {
			const newFile = e.target.files[i];
			// const fileType = newFile.type.slice(0, 5);
			const fileType = newFile.type.includes("image");
			if (!fileType) {
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
			<InputInfo>
				<ShortTitle>照片簡述：</ShortTitle>
				<InputArea
					value={imgDescription}
					onChange={(e) => {
						setImgDescription(e.target.value);
					}}
				/>
			</InputInfo>
			<InputInfo>
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
			</InputInfo>
			<MultiImgs>
				{files.map((file) => {
					return (
						<CoverImges key={file.id}>
							<Image src={URL.createObjectURL(file)} />
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
