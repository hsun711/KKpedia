import React, { useState, useEffect } from "react";
import firebase from "../utils/firebase";
import styled from "styled-components";
import RenderPost from "./RenderPost";
import cancel from "../img/cancel.png";
const ProfileContainer = styled.div`
	margin-top: 5vmin;
	padding: 4vmin;
`;

const Container = styled.div`
	position: relative;
	/* outline: 1px solid black; */
	display: flex;
	flex-direction: column;
`;

const DeletePost = styled.div`
	background-image: url(${cancel});
	background-repeat: no-repeat;
	background-size: 100%;
	width: 3vmin;
	height: 3vmin;
	position: absolute;
	top: 10px;
	right: 65px;
	cursor: pointer;
`;

function PersonalPost() {
	const db = firebase.firestore();
	const userId = firebase.auth().currentUser.uid;
	const [postData, setPostData] = useState([]);

	useEffect(() => {
		db.collection("posts")
			.where("userId", "==", `${userId}`)
			.orderBy("postTime", "desc")
			.onSnapshot((querySnapshot) => {
				const item = [];
				querySnapshot.forEach((doc) => {
					const data = {
						data: doc.data(),
						id: doc.id,
					};
					item.push(data);
				});
				setPostData(item);
			});
	}, []);

	const handleDelete = (e) => {
		db.collection("posts")
			.doc(`${e.target.dataset.id}`)
			.delete()
			.then(() => {
				alert("被刪除了留言已回不來了😢😢");
			})
			.catch((error) => {
				console.error("Error removing document: ", error);
			});
	};

	return (
		<ProfileContainer>
			{postData.map((item) => {
				return (
					<Container key={item.id}>
						<DeletePost onClick={handleDelete} data-id={item.id} />
						<RenderPost item={item} />
					</Container>
				);
			})}
		</ProfileContainer>
	);
}

export default PersonalPost;
