import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import firebase from "../utils/firebase";
import ungood from "../img/unthumbs-up.png";
import dogood from "../img/thumbs-up.png";
import comment from "../img/comment.png";
import userIcon from "../img/user.png";

const CommentArea = styled.div`
	width: 90%;
	align-self: center;
	background-color: rgba(256, 256, 256, 0.5);
	box-shadow: 10px 10px 30px 5px rgba(0, 0, 0, 0.2);
	/* outline: 1px solid black; */
	display: flex;
	flex-direction: column;
	padding: 3vmin;
	border-radius: 10px;
	margin: 3vmin 0vmin;
`;

const PosterDetail = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	margin-bottom: 1vmin;
	padding-left: 1vmin;
`;

const PosterImage = styled.img`
	width: 6vmin;
	height: 6vmin;
	border-radius: 50%;
	/* outline: 2px solid black; */
`;

const PosterText = styled.div`
	width: 100%;
	margin-left: 1.5vmin;
`;

const PosterName = styled.p`
	font-size: 3vmin;
`;

const TimeStamp = styled.div`
	font-size: 1.5vmin;
`;

const Comment = styled.div`
	padding: 2vmin;
	word-wrap: break-word;
	@media screen and (max-width: 1200px) {
		font-size: 2.2vmin;
	}
`;

const CommentText = styled.p`
	font-size: 3.5vmin;
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

const SmallTxt = styled.p`
	font-size: 1.3vmin;
	align-self: flex-end;
	@media screen and (max-width: 1200px) {
		font-size: 1vmin;
	}
`;

const EditArea = styled.div`
	display: flex;
	align-items: center;
`;

const TextArea = styled.textarea`
	width: 90%;
	height: 10vmin;
	font-size: 2.5vmin;
	border-radius: 10px;
	margin-top: 3vmin;
	padding: 1vmin;
	align-self: center;
	@media screen and (max-width: 1200px) {
		height: 7vmin;
	}
`;

const Submit = styled.div`
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

function RenderPost({ item }) {
	const time = item.data.postTime;
	const [replyComment, setReplyComment] = useState("");
	const [renderReply, setRenderReply] = useState([]);
	const [showReply, setShowReply] = useState({});
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
					console.log(doc.data());
				});

				setShowReply(item[0]);
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

	// console.log(userImg);

	return (
		<CommentArea>
			<PosterDetail>
				<PosterImage src={item.data.userImage || userIcon} />
				<PosterText>
					<PosterName>{item.data.displayName}</PosterName>
					<TimeStamp>{new Date(time).toLocaleString()}</TimeStamp>
				</PosterText>
			</PosterDetail>
			<hr />
			<EditArea>
				<Comment>
					<CommentText>{item.data.content}</CommentText>
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
										<ReplyUserName>{item.replyUser}</ReplyUserName>
									</ReplyText>
									<Comment>{item.content}</Comment>
									<SmallTxt>
										{new Date(item.postTime).toLocaleString()}
									</SmallTxt>
								</ReplyComment>
							</Recomment>
						);
					})}
				</>
			) : (
				<>
					{showReply !== undefined ? (
						<Recomment>
							<ReplyImg src={showReply.userImg || userIcon} />
							<ReplyComment>
								<ReplyText>
									<ReplyUserName>{showReply.replyUser}</ReplyUserName>
								</ReplyText>
								<Comment>{showReply.content}</Comment>
								<SmallTxt>
									{new Date(showReply.postTime).toLocaleString()}
								</SmallTxt>
							</ReplyComment>
						</Recomment>
					) : (
						<></>
					)}
				</>
			)}

			<TextArea
				value={replyComment}
				onChange={(e) => {
					setReplyComment(e.target.value);
				}}
			/>
			<Submit onClick={SendReply}>回覆</Submit>
		</CommentArea>
	);
}

export default RenderPost;
