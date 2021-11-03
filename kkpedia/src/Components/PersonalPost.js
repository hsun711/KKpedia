import React, { useState, useEffect } from "react";
import firebase from "../utils/firebase";
import styled from "styled-components";
import RenderPost from "./RenderPost";

const ProfileContainer = styled.div`
	/* outline: 1px solid black; */
	margin-top: 5vmin;
	padding: 4vmin;
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

	return (
		<ProfileContainer>
			{postData.map((item) => {
				return <RenderPost item={item} key={item.id} />;
			})}
		</ProfileContainer>
	);
}

export default PersonalPost;
