import React, { useEffect, useState } from "react";
import styled from "styled-components";
import idolimage from "../img/wanted.png";
import { v4 as uuidv4 } from "uuid";
import firebase from "../utils/firebase";
import send from "../img/submit.png";
import ungood from "../img/unthumbs-up.png";
import dogood from "../img/thumbs-up.png";
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
	cursor: pointer;
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

const EditArea = styled.div`
	display: flex;
	align-items: center;
`;

function RenderPost({ item }) {
	const time = item.data.postTime;
	const [replyComment, setReplyComment] = useState("");
	const [renderReply, setRenderReply] = useState([]);
	const [userImg, setUserImg] = useState("");
	const [userName, setUserName] = useState("");
	const [good, setGood] = useState(false);
	const [showComment, setShowComment] = useState(false);
	const [goodNum, setGoodNum] = useState("");
	const [commentNum, setCommentNum] = useState("");
	const db = firebase.firestore();
	const userId = firebase.auth().currentUser.uid;
	const docRef = db.collection("users").doc(`${userId}`);

	// console.log(item);

	const AddGood = () => {
		const liked = db.collection("posts").doc(`${item.id}`);
		if (good === true) {
			setGood(false);
			liked
				.update({
					likedBy: firebase.firestore.FieldValue.arrayRemove(`${userId}`),
				})
				.then(() => {});
		} else {
			setGood(true);
			liked
				.update({
					likedBy: firebase.firestore.FieldValue.arrayUnion(`${userId}`),
				})
				.then(() => {});
		}
	};

	const RenderComment = () => {
		setShowComment(!showComment);
	};

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
					// console.log(item);
				});
				setRenderReply(item);
				setCommentNum(item.length);
			});

		db.collection("posts")
			.doc(`${item.id}`)
			.onSnapshot((doc) => {
				if (doc.data()?.likedBy.includes(`${userId}`)) {
					setGood(true);
				} else {
					setGood(false);
				}
				setGoodNum(doc.data()?.likedBy.length);
			});
	}, []);

	const SendReply = async () => {
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
			<EditArea>
				<Comment>
					<p>{item.data.content}</p>
				</Comment>
			</EditArea>

			<hr />
			<Icon>
				<EachIcon src={good ? dogood : ungood} onClick={AddGood} />
				<GoodTotal>{goodNum || 0}</GoodTotal>
				<EachIcon src={comment} onClick={RenderComment} />
				<GoodTotal>{commentNum || 0}</GoodTotal>
			</Icon>
			{showComment ? (
				<>
					{renderReply.map((item) => {
						return (
							<Recomment key={uuidv4()}>
								<ReplyImg src={item.userImg || userIcon} />
								<ReplyComment>
									<ReplyText>
										<SmallTxt>{item.replyUser}</SmallTxt>
										<SmallTxt>
											{new Date(item.postTime).toLocaleString()}
										</SmallTxt>
									</ReplyText>
									<Comment>{item.content}</Comment>
								</ReplyComment>
							</Recomment>
						);
					})}
				</>
			) : (
				<></>
			)}

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
