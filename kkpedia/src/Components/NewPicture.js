import React, { useState } from "react";
import styled from "styled-components";
import firebase from "../utils/firebase";
import { v4 as uuidv4, v4 } from "uuid";
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

function NewPicture({ title, setPopAddOne, AddPicture }) {
	const db = firebase.firestore();
	const [imgfile, setImgFile] = useState([]);
	const [userName, setUserName] = useState("");
	const user = firebase.auth().currentUser;
	const docRef = db.collection("users").doc(`${user.uid}`);
	const [files, setFiles] = useState([]);
	const [imgDescription, setImgDescription] = useState("");

	docRef.get().then((doc) => {
		if (doc.exists) {
			setUserName(doc.data().userName);
		} else {
			// doc.data() will be undefined in this case
			console.log("No such document!");
		}
	});

	const OnFileChange = (e) => {
		// Get Files
		for (let i = 0; i < e.target.files.length; i++) {
			const newFile = e.target.files[i];
			// newFile["id"] = Math.random();
			setFiles((prevState) => [...prevState, newFile]);
		}
	};

	const UploadMultiImage = (e) => {
		const documentRef = db.collection("categories").doc(`${title}`);
		const item = [];
		const images = [];
		files.forEach((file) => {
			console.log(file);
			const fileRef = firebase
				.storage()
				.ref("idol_images/" + documentRef.id + uuidv4())
				.put(file);
			fileRef.on(
				firebase.storage.TaskEvent.STATE_CHANGED,
				(snapshot) => {
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					if (snapshot.state === firebase.storage.TaskState.RUNNING) {
						console.log(`Progress: ${progress}%`);
					}
				},
				(error) => console.log(error.code),
				async () => {
					const downloadURL = await fileRef.snapshot.ref.getDownloadURL();
				}
			);
		});

		Promise.all(images)
			.then(() => {
				alert("All files uploaded");
				AddPicture(false);
			})
			.catch((err) => console.log(err.code));
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
					style={{ display: "none" }}
					onChange={OnFileChange}
				/>
				{files.map((file) => {
					return <CoverImage src={URL.createObjectURL(file)} key={file.id} />;
				})}
			</ArtistName>
			<SendBtn onClick={UploadMultiImage} />
		</Container>
	);
}

export default NewPicture;
