import React from "react";
import styled from "styled-components";
import firebase from "../../utils/firebase";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	cursor: pointer;
	padding: 1vmin;
	&:hover {
		background-color: #f8eedb;
	}
`;

function Notification({ data }) {
	const db = firebase.firestore();
	const user = firebase.auth().currentUser;
	const deleteNews = () => {
		db.collection("users")
			.doc(`${user.uid}`)
			.collection("news")
			.doc(`${data.docid}`)
			.delete()
			.then(() => {
				window.location.replace(
					`/${data.topic}/${data.title}/${data.locationName}`
				);
			});
	};
	return (
		<Container onClick={deleteNews}>{data.title} 有更新景點囉~~</Container>
	);
}

export default Notification;
