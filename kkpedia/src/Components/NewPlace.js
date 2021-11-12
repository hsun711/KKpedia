import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import add from "../img/addimage.png";
import paper from "../img/rm429-013.png";
import firebase from "../utils/firebase";
import MapAutocomplete from "./MapAutocomplete";
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
`;

const InputTitle = styled.p`
	width: 100%;
	font-size: 2.5vmin;
	font-weight: 600;
	@media screen and (max-width: 1200px) {
		font-size: 2vmin;
	}
`;

const InputArea = styled.input`
	border-radius: 5px;
	width: 100%;
	height: 4vmin;
	margin: 2vmin 0px;
	padding-left: 1vmin;
	padding-top: 0.25vmin;
	font-size: 2vmin;
	@media screen and (max-width: 1200px) {
		height: 5vmin;
		margin: 1vmin 0vmin;
	}
`;

const Title = styled.div`
	width: 100%;
	margin-top: 3vmin;
	display: flex;
	align-items: center;
	@media screen and (max-width: 1200px) {
		flex-direction: column;
		align-items: flex-start;
	}
`;

const ShortTitle = styled(InputTitle)`
	width: 25vmin;
`;

const AddImagesTitle = styled.p`
	width: 18.5vmin;
	font-size: 2.5vmin;
	font-weight: 600;
	@media screen and (max-width: 1200px) {
		width: 100%;
		font-size: 2vmin;
	}
`;

const AddImages = styled.div`
	background-image: url(${add});
	background-size: 100%;
	background-repeat: no-repeat;
	width: 4vmin;
	height: 4vmin;
	cursor: pointer;
	@media screen and (max-width: 1200px) {
		width: 5vmin;
		height: 5vmin;
		margin: 1vmin 0vmin;
	}
`;

const MultiImgs = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

const Images = styled.img`
	width: 7vmin;
	margin-left: 3vmin;
	margin-top: 2vmin;
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

function NewPlace({ title, setPopAddPlace, setPlaceName, topic }) {
	const user = firebase.auth().currentUser;
	const db = firebase.firestore();
	const userId = user.uid;
	const docRef = db.collection("users").doc(`${userId}`);
	const [loading, setLoading] = useState(false);
	const [userLevel, setUserLevel] = useState(0);
	const [followUsers, setFollowUsers] = useState([]);
	const [userName, setUserName] = useState("");
	const [locationName, setLocationName] = useState("");
	const [description, setDescription] = useState("");
	const [address, setAddress] = useState("");
	const [placeId, setPlaceId] = useState("");
	const [latitude, setLatitude] = useState({});
	const [files, setFiles] = useState([]);

	useEffect(() => {
		db.collection("categories")
			.doc(`${title}`)
			.get()
			.then((doc) => {
				// console.log(doc.data().followedBy);
				setFollowUsers(doc.data().followedBy);
			});
	}, []);

	docRef.get().then((doc) => {
		if (doc.exists) {
			setUserName(doc.data().userName);
			if (doc.data().userLevel === undefined) {
				setUserLevel(0);
			} else {
				setUserLevel(doc.data().userLevel);
			}
			// console.log(doc.data());
		} else {
			// doc.data() will be undefined in this case
			console.log("No such document!");
		}
	});
	// console.log(userLevel);

	// 把從子層 MapAutocomplete 收到的資訊存進 state 裡
	const GetAddress = (addressdata) => {
		setAddress(addressdata[0]);
		setPlaceId(addressdata[1]);
		setLatitude(addressdata[2]);
	};

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
			userLevel: userLevel + 5,
		});
	};

	// 傳送通知給有追蹤的使用者
	const SendAlert = () => {
		const docid = db
			.collection("users")
			.doc(`${user}`)
			.collection("news")
			.doc().id;

		const otherFollower = followUsers.filter((follower) => {
			return follower !== user.uid;
		});

		otherFollower.forEach((user) => {
			db.collection("users")
				.doc(`${user}`)
				.collection("news")
				.doc(docid)
				.set(
					{
						title: title,
						topic: topic,
						docid: docid,
					},
					{ merge: true }
				)
				.then(() => {});
		});
	};

	const AddNewPlace = () => {
		setLoading(true);
		const documentRef = db.collection("categories").doc(`${title}`);
		const promises = [];
		const data = {
			topic: topic,
			title: title,
			address: address,
			latitude: latitude,
			placeId: placeId,
			description: description,
			locationName: locationName,
			postUser: userName,
			uid: userId,
			images: [],
		};
		documentRef
			.collection("places")
			.doc(`${locationName}`)
			.set(data, { merge: true })
			.then((docRef) => {
				UpdateLevel();
				SendAlert();
			});
		files.map((file) => {
			// console.log(file);
			const uploadTask = firebase
				.storage()
				.ref(`place_images/${documentRef.id}/${file.id}`)
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
						.ref(`place_images/${documentRef.id}/`)
						.child(`${file.id}`)
						.getDownloadURL()
						.then((imgUrls) => {
							documentRef
								.collection("places")
								.doc(`${locationName}`)
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
				setLoading(false);
				setPopAddPlace(false);
			})
			.catch((err) => console.log(err));
	};
	return (
		<Container>
			<InputTitle>藝人 / 戲劇 / 綜藝名稱：{title}</InputTitle>
			<Title>
				<InputTitle>貢獻者暱稱：{userName}</InputTitle>
			</Title>
			<Title>
				<ShortTitle>景點/餐廳名稱：</ShortTitle>
				<InputArea
					value={locationName}
					onChange={(e) => {
						setLocationName(e.target.value);
					}}
				/>
			</Title>
			<Title>
				<ShortTitle>景點/餐廳描述：</ShortTitle>
				<InputArea
					placeholder="ex.哪個藝人po文的、哪個場景出現的"
					value={description}
					onChange={(e) => {
						setDescription(e.target.value);
					}}
				/>
			</Title>
			<Title>
				<ShortTitle>詳細地址：</ShortTitle>
				<MapAutocomplete placeaddress={GetAddress} />
			</Title>
			<Title>
				<AddImagesTitle>上傳照片：</AddImagesTitle>
				<AddImages as="label" htmlFor="postImages" />
				<input
					type="file"
					multiple
					id="postImages"
					style={{ display: "none" }}
					onChange={OnFileChange}
				/>
			</Title>
			<MultiImgs>
				{files.map((file) => {
					return <Images src={URL.createObjectURL(file)} key={file.id} />;
				})}
			</MultiImgs>
			<SendBtn onClick={AddNewPlace}>新增</SendBtn>
			{loading && <Loading />}
		</Container>
	);
}

export default NewPlace;
