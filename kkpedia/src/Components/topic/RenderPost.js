import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import ReplyPost from "./ReplyPost";
import ungood from "../../img/unthumbs-up.png";
import dogood from "../../img/thumbs-up.png";
import comment from "../../img/comment.png";
import userIcon from "../../img/user.png";
import {
	getUserData,
	getPostsData,
	getPostLikedBy,
	toggleGoodIcon,
	sendReplyComment,
} from "../../utils/firebaseFunc";
import {
	CommentArea,
	PosterDetail,
	PosterImage,
	PosterText,
	PosterName,
	TimeStamp,
	Comment,
	CommentText,
	Icon,
	CommentIcon,
	ThumbsIcon,
	GoodTotal,
	EditArea,
	TextArea,
	Submit,
} from "../../style/post";

function RenderPost({ item }) {
	const time = item.data.postTime;
	const [posts, setPosts] = useState([]);
	const [replyComment, setReplyComment] = useState("");
	const [userImg, setUserImg] = useState("");
	const [userName, setUserName] = useState("");
	const [good, setGood] = useState(false);
	const [showComment, setShowComment] = useState(false);
	const [goodNum, setGoodNum] = useState("");
	const currentUser = useSelector((state) => state.currentUser);

	useEffect(() => {
		const unsubscribe = getPostsData(item.id, setPosts);

		getUserData(item.data.userId).then((doc) => {
			setUserImg(doc.data().userImage);
			setUserName(doc.data().userName);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	useEffect(() => {
		const unsubscribe = getPostLikedBy(
			item.id,
			currentUser.uid,
			setGood,
			setGoodNum
		);

		return () => {
			unsubscribe();
		};
	}, []);

	const AddGood = () => {
		if (good === true) {
			setGood(false);
			toggleGoodIcon(false, item.id, currentUser.uid);
		} else {
			setGood(true);
			toggleGoodIcon(true, item.id, currentUser.uid);
		}
	};

	const RenderComment = () => {
		setShowComment(!showComment);
	};

	const SendReply = () => {
		setReplyComment("");
		if (replyComment === "") {
			Swal.fire("請輸入內容");
			return;
		}
		const data = {
			content: replyComment,
			docid: item.id,
			userName: userName,
			postTime: new Date().getTime(),
			userId: currentUser.uid,
		};

		sendReplyComment(item.id, data);
	};

	return (
		<CommentArea>
			<PosterDetail>
				<PosterImage src={userImg || userIcon} />
				<PosterText>
					<PosterName>{userName}</PosterName>
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
				<ThumbsIcon src={good ? dogood : ungood} onClick={AddGood} />
				<GoodTotal>{goodNum || 0}</GoodTotal>
				<CommentIcon src={comment} onClick={RenderComment} />
				<GoodTotal>{posts.length || 0}</GoodTotal>
			</Icon>
			{showComment ? (
				<>
					{posts.map((item) => {
						return <ReplyPost key={item.postTime} item={item} />;
					})}
				</>
			) : null}

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
