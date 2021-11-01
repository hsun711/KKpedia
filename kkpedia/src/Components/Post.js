import React, { useEffect, useState } from "react";
import styled from "styled-components";
import firebase from "../utils/firebase";
import RenderPost from "./RenderPost";
import send from "../img/submit.png";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	background-color: beige;
	width: 100%;
	padding: 5vmin 7vmin;
	border-radius: 10px;
`;
const Title = styled.p`
	font-size: 4vmin;
	font-weight: 600;
	margin-bottom: 2vmin;
`;

const TextArea = styled.textarea`
	width: 90%;
	height: 10vmin;
	font-size: 2vmin;
	margin-left: 4vmin;
	border-radius: 7px;
	padding: 1vmin;
	align-self: center;
`;

const Send = styled.div`
	background-image: url(${send});
	background-size: 90%;
	background-repeat: no-repeat;
	width: 10vmin;
	height: 10vmin;
	border-radius: 10px;
	margin-left: 90%;
	cursor: pointer;
	&:hover {
		background-position-x: 2px;
		background-position-y: 2px;
	}
`;

function Post({ title }) {
	const [postMsg, setPostMsg] = useState("");
	const [userName, setUserName] = useState("");
	const [post, setPost] = useState([]);
	const db = firebase.firestore();
	const user = firebase.auth().currentUser;
	const userId = firebase.auth().currentUser.uid;
	const docRef = db.collection("users").doc(`${userId}`);

	docRef.get().then((doc) => {
		if (doc.exists) {
			setUserName(doc.data().userName);
		} else {
			// doc.data() will be undefined in this case
			console.log("No such document!");
		}
	});

	useEffect(() => {
		db.collection("posts")
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
	}, []);
	// console.log(post);

	const SendMsg = () => {
		setPostMsg("");
		const data = {
			content: postMsg,
			title: title,
			postTime: new Date().getTime(),
			displayName: userName,
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
			<Send onClick={SendMsg} />
			{post.map((item) => {
				return <RenderPost item={item} key={item.id} />;
			})}
		</Container>
	);
}

export default Post;
