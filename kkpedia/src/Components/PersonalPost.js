import React, { useState, useEffect } from "react";
import firebase from "../utils/firebase";
import styled from "styled-components";
import Swal from "sweetalert2";
import RenderPost from "./RenderPost";
import cancel from "../img/trash.png";

const ProfileContainer = styled.div`
	outline: 5px solid black;
	padding: 4vmin;
`;

const Container = styled.div`
	position: relative;
	flex-direction: column;
	margin-top: 2vmin;
	display: flex;
`;

const DeletePost = styled.div`
	background-image: url(${cancel});
	background-repeat: no-repeat;
	background-size: 100%;
	width: 4vmin;
	height: 4vmin;
	position: absolute;
	top: 4vmin;
	right: 9vmin;
	cursor: pointer;
	@media screen and (max-width: 1200px) {
		right: 7vmin;
		top: 5vmin;
	}
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
		Swal.fire({
			title: "確定要刪除嗎?",
			text: "刪除就回不來了喔!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes!",
		}).then((result) => {
			if (result.isConfirmed) {
				db.collection("posts")
					.doc(`${e.target.dataset.id}`)
					.delete()
					.then(() => {
						// alert("被刪除了留言已回不來了😢😢");
						Swal.fire("刪除成功!", "被刪除了留言已回不來了😢😢", "success");
					})
					.catch((error) => {
						console.error("Error removing document: ", error);
					});
			}
		});
	};

	return (
		<>
			{postData.map((item) => {
				return (
					<Container key={item.id}>
						<DeletePost onClick={handleDelete} data-id={item.id} />
						<RenderPost item={item} />
					</Container>
				);
			})}
		</>
	);
}

export default PersonalPost;
