import React, { useEffect, useState } from "react";
import styled from "styled-components";
import firebase from "../utils/firebase";
import { useHistory } from "react-router-dom";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	cursor: pointer;
	padding: 1vmin;
	&:hover {
		background-color: #dff9fb;
	}
`;

function Notification({ data }) {
	const db = firebase.firestore();
	const history = useHistory();
	const user = firebase.auth().currentUser;

	const deleteNews = () => {
		db.collection("users")
			.doc(`${user.uid}`)
			.collection("news")
			.doc(`${data.docid}`)
			.delete()
			.then(() => {});
		history.push(`/${data.topic}/${data.title}`);
	};
	return (
		<Container onClick={deleteNews}>{data.title} 有更新景點囉~~</Container>
	);
}

export default Notification;
