import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import firebase from "../utils/firebase";
import userIcon from "../img/user.png";

const Recomment = styled.div`
	display: flex;
	padding: 2vmin;
`;

const PosterImage = styled.img`
	width: 6vmin;
	height: 6vmin;
	border-radius: 50%;
	/* outline: 2px solid black; */
`;

const ReplyImg = styled(PosterImage)`
	width: 4vmin;
	height: 4vmin;
`;

const ReplyComment = styled.div`
	padding: 1vmin 2vmin 2vmin;
	background-color: #dfe6e9;
	min-width: 30vmin;
	margin-left: 1vmin;
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	@media screen and (max-width: 1200px) {
		width: 100%;
	}
`;

const ReplyText = styled.div`
	display: flex;
	align-items: center;
`;

const ReplyUserName = styled.p`
	font-size: 2vmin;
	font-weight: 600;
`;

const Comment = styled.div`
	padding: 2vmin;
	word-wrap: break-word;
	@media screen and (max-width: 1200px) {
		font-size: 2.2vmin;
	}
`;

const SmallTxt = styled.p`
	font-size: 1.3vmin;
	align-self: flex-end;
	@media screen and (max-width: 1200px) {
		font-size: 1vmin;
	}
`;

function ReplyPost({ item }) {
	const db = firebase.firestore();
	const [user, setUser] = useState("");
	const [userImage, setUserImage] = useState("");
	useEffect(() => {
		db.collection("users")
			.doc(`${item.userId}`)
			.get()
			.then((doc) => {
				setUser(doc.data().userName);
				setUserImage(doc.data().userImage);
			});
	}, []);

	return (
		<Recomment>
			<ReplyImg src={userImage || userIcon} />
			<ReplyComment>
				<ReplyText>
					<ReplyUserName>{user}</ReplyUserName>
				</ReplyText>
				<Comment>{item.content}</Comment>
				<SmallTxt>{new Date(item.postTime).toLocaleString()}</SmallTxt>
			</ReplyComment>
		</Recomment>
	);
}

export default ReplyPost;
