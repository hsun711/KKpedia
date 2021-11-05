import React, { useState, useEffect } from "react";
import styled from "styled-components";
import firebase from "../utils/firebase";
import { v4 as uuidv4 } from "uuid";
import add from "../img/plus.png";
import send from "../img/submit.png";
import cover from "../img/wanted.png";

const Container = styled.div`
	width: 70vmin;
	background-color: beige;
	position: fixed;
	top: 50%;
	left: 50%;
	margin-left: -35vmin;
	margin-top: -40vh;
	padding: 5vmin 7vmin;
	display: flex;
	flex-direction: column;
	z-index: 5;
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
	@media screen and (max-width: 800px) {
		font-size: 1.5vmin;
	}
`;

const ArtistName = styled.div`
	width: 100%;
	margin-top: 3vmin;
	display: flex;
	align-items: center;
`;

const ShortTitle = styled(InputTitle)`
	width: 20vmin;
`;

const Add = styled.div`
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
	height: 10vmin;
	border-radius: 10px;
	margin-left: 45vmin;
	cursor: pointer;
	&:hover {
		background-position-x: 2px;
		background-position-y: 2px;
	}
`;

function NewPicture({ title, AddPicture }) {
	const db = firebase.firestore();
	const [userName, setUserName] = useState("");
	const [userLevel, setUserLevel] = useState(0);
	const [files, setFiles] = useState([]);
	const [imgurl, setImgurl] = useState([]);
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
			const id = uuidv4();
			newFile["id"] = id;
			setFiles((prevState) => [...prevState, newFile]);
		}
	};
	const UpdateLevel = () => {
		docRef.update({
			userLevel: userLevel + 7,
		});
	};
	// console.log(files);

	const handleUpload = () => {
		const documentRef = db.collection("categories").doc(`${title}`);
		const promises = [];
		const docid = documentRef.collection("photos").doc().id;
		const data = {
			postUser: userName,
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
			// console.log(file);
			const uploadTask = firebase
				.storage()
				.ref(`idol_images/${documentRef.id}/${file.id}`)
				.put(file);
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
						.child(`${file.id}`)
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
		});
		Promise.all(promises)
			.then(() => {
				alert("新增成功😁😁😁😁");
				AddPicture(false);
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
				<ShortTitle>上傳照片：</ShortTitle>
				<Add as="label" htmlFor="uploadImage" />
				<input
					type="file"
					id="uploadImage"
					multiple
					style={{ display: "none" }}
					onChange={OnFileChange}
				/>
				{files.map((file) => {
					return <CoverImage src={URL.createObjectURL(file)} key={file.id} />;
				})}
			</ArtistName>
			<SendBtn onClick={handleUpload} />
		</Container>
	);
}

export default NewPicture;
