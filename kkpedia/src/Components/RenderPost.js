import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import idolimage from "../img/wanted.png";
import { v4 as uuidv4 } from "uuid";
import firebase from "../utils/firebase";
import send from "../img/submit.png";
import good from "../img/thumbs-up.png";
import comment from "../img/comment.png";
import userIcon from "../img/user.png";

const CommentArea = styled.div`
	width: 80vmin;
	align-self: center;
	outline: 1px solid black;
	display: flex;
	flex-direction: column;
	padding: 3vmin;
	border-radius: 10px;
	margin-bottom: 3vmin;
`;

const PosterDetail = styled.div`
	display: flex;
	margin-bottom: 1vmin;
`;

const PosterImage = styled.img`
	width: 5vmin;
	height: 5vmin;
	border-radius: 50%;
	outline: 1px solid black;
`;

const PosterText = styled.div`
	height: 5vmin;
	margin-left: 0.5vmin;
`;

const Comment = styled.div`
	padding: 2vmin;
`;

const Icon = styled.div`
	display: flex;
	padding: 1vmin;
`;

const EachIcon = styled.img`
	width: 3vmin;
	height: 3vmin;
	cursor: pointer;
	margin-right: 0.5vmin;
`;

const GoodTotal = styled.p`
	font-size: 3vmin;
	margin-right: 4vmin;
`;

const Recomment = styled.div`
	display: flex;
	padding: 2vmin;
`;

const ReplyImg = styled(PosterImage)`
	width: 3vmin;
	height: 3vmin;
`;

const ReplyComment = styled.div`
	padding: 1vmin 2vmin 2vmin;
	width: 100%;
	background-color: #dfe6e9;
	margin-left: 1vmin;
	border-radius: 10px;
`;

const TextArea = styled.input`
	width: 90%;
	height: 5vmin;
	font-size: 2vmin;
	margin-left: 4vmin;
	border-radius: 10px;
	padding: 1vmin;
	align-self: center;
`;

const Submit = styled.div`
	background-image: url(${send});
	background-size: 90%;
	background-repeat: no-repeat;
	width: 6vmin;
	height: 5vmin;
	border-radius: 10px;
	margin-left: 90%;
	cursor: pointer;
	&:hover {
		background-position-x: 2px;
		background-position-y: 2px;
	}
`;

const ReplyText = styled.div`
	display: flex;
	align-items: center;
`;

const SmallTxt = styled.p`
	font-size: 1.3vmin;
	font-weight: 600;
	margin-right: 1.3vmin;
`;

function RenderPost({ item }) {
	const time = item.data.postTime;
	const [replyComment, setReplyComment] = useState("");
	const [renderReply, setRenderReply] = useState([]);
	const [userImg, setUserImg] = useState("");
	const [userName, setUserName] = useState("");
	const db = firebase.firestore();
	const userId = firebase.auth().currentUser.uid;
	const docRef = db.collection("users").doc(`${userId}`);

	// console.log(item);

	docRef.get().then((doc) => {
		if (doc.exists) {
			setUserImg(doc.data().userImage);
			setUserName(doc.data().userName);
			// console.log(doc.data().userImage);
		} else {
			// doc.data() will be undefined in this case
			console.log("No such document!");
		}
	});

	useEffect(() => {
		db.collection("posts")
			.doc(`${item.id}`)
			.collection("comments")
			.orderBy("postTime", "desc")
			.onSnapshot((querySnapshot) => {
				const item = [];
				querySnapshot.forEach((doc) => {
					// doc.data() is never undefined for query doc snapshots
					item.push(doc.data());
				});
				setRenderReply(item);
			});
	}, []);

	const SendReply = async () => {
		// console.log(item.id);
		setReplyComment("");
		const data = {
			content: replyComment,
			docid: item.id,
			replyUser: userName,
			postTime: new Date().getTime(),
			userImg: userImg,
		};

		await db
			.collection("posts")
			.doc(`${item.id}`)
			.collection("comments")
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
		<CommentArea>
			<PosterDetail>
				<PosterImage src={idolimage} />
				<PosterText>
					<h3>{item.data.displayName}</h3>
					<p>{new Date(time).toLocaleString()}</p>
				</PosterText>
			</PosterDetail>
			<hr />
			<Comment>
				<p>{item.data.content}</p>
			</Comment>
			<hr />
			<Icon>
				<EachIcon src={good} />
				<GoodTotal>10</GoodTotal>
				<EachIcon src={comment} />
			</Icon>
			{renderReply.map((item) => {
				return (
					<Recomment>
						<ReplyImg src={item.userImg || userIcon} />
						<ReplyComment>
							<ReplyText>
								<SmallTxt>{item.replyUser}</SmallTxt>
								<SmallTxt>{new Date(item.postTime).toLocaleString()}</SmallTxt>
							</ReplyText>
							<Comment>{item.content}</Comment>
						</ReplyComment>
					</Recomment>
				);
			})}
			{/* <Recomment>
				<ReplyImg src={idolimage} />
				<ReplyComment>
					<ReplyText>
						<SmallTxt>333</SmallTxt>
						<SmallTxt>2021/12/5</SmallTxt>
					</ReplyText>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eu
						placerat urna, quis tincidunt lectus. Cras id ligula id mauris
						luctus fermentum. Lorem ipsum dolor sit amet.
					</p>
				</ReplyComment>
			</Recomment> */}
			<TextArea
				value={replyComment}
				onChange={(e) => {
					setReplyComment(e.target.value);
				}}
			/>
			<Submit onClick={SendReply} />
		</CommentArea>
	);
}

export default RenderPost;
