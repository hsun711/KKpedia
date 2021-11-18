import React, { useEffect, useState } from "react";
import styled from "styled-components";
import firebase from "../utils/firebase";
import RenderPost from "./RenderPost";
import Swal from "sweetalert2";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	border-radius: 10px;
	@media screen and (max-width: 1200px) {
		width: 90%;
	}
`;
const Title = styled.p`
	font-size: 4vmin;
	font-weight: 600;
	margin: 2vmin 0vmin;
`;

const TextArea = styled.textarea`
	width: 100%;
	height: 20vmin;
	font-size: 3vmin;
	border: none;
	border-radius: 7px;
	padding: 1vmin;
	align-self: center;
`;

const Send = styled.div`
	align-self: flex-end;
	background-color: transparent;
	background-image: linear-gradient(to bottom, #fff, #f8eedb);
	border: 0 solid #e5e7eb;
	border-radius: 8px;
	box-sizing: border-box;
	color: #482307;
	column-gap: 1rem;
	cursor: pointer;
	display: flex;
	font-size: 2.5vmin;
	font-weight: 700;
	line-height: 2.5vmin;
	margin: 2vmin;
	outline: 2px solid transparent;
	padding: 1vmin 2vmin;
	text-align: center;
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
`;

function Post({ title }) {
	const [postMsg, setPostMsg] = useState("");
	const [userData, setUserData] = useState("");
	const [post, setPost] = useState([]);
	const db = firebase.firestore();
	const user = firebase.auth().currentUser;
	const userId = firebase.auth().currentUser.uid;
	const docRef = db.collection("users").doc(`${userId}`);

	useEffect(() => {
		docRef.get().then((doc) => {
			if (doc.exists) {
				// console.log(doc.data());
				setUserData(doc.data());
			} else {
				// doc.data() will be undefined in this case
				console.log("No such document!");
			}
		});

		const unsubscribe = db
			.collection("posts")
			.where("title", "==", `${title}`)
			.orderBy("postTime", "desc")
			.onSnapshot((querySnapshot) => {
				const item = [];
				querySnapshot.forEach((doc) => {
					// doc.data() is never undefined for query doc snapshots
					const data = {
						data: doc.data(),
						id: doc.id,
					};
					item.push(data);
					// console.log(doc.id);
				});
				setPost(item);
			});
		return () => unsubscribe();
	}, []);
	// console.log(post);

	const SendMsg = () => {
		setPostMsg("");
		if (postMsg === "") {
			Swal.fire("請輸入內容");
			return;
		}
		const data = {
			content: postMsg,
			title: title,
			postTime: new Date().getTime(),
			displayName: userData.userName,
			// userImage: userData.userImage,
			userId: userId,
			userMail: user.email,
			likedBy: [],
		};

		db.collection("posts")
			.doc()
			.set(data, { merge: true })
			.then((docRef) => {
				// console.log("Document written with ID: );
			})
			.catch((error) => {
				console.error("Error adding document: ", error);
			});
	};

	return (
		<Container>
			<Title>Create a Post</Title>
			<TextArea
				value={postMsg}
				onChange={(e) => {
					setPostMsg(e.target.value);
				}}
			/>
			<Send onClick={SendMsg}>送出</Send>
			{post.map((item) => {
				return <RenderPost item={item} key={item.id} />;
			})}
		</Container>
	);
}

export default Post;
