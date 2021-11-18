import React, { useEffect, useState } from "react";
import firebase from "../utils/firebase";
import styled from "styled-components";
import Swal from "sweetalert2";
import sticker from "../img/sticker2.png";
import idol from "../img/wanted.png";
import unlike from "../img/unlike.png";
import like from "../img/like.png";
import { Link } from "react-router-dom";

const EachIdol = styled.div`
	/* outline: 2px solid green; */
	background-image: url(${sticker});
	background-size: 100%;
	width: 30vmin;
	height: 30vmin;
	/* margin: 0 auto; */
	display: flex;
	flex-direction: column;
	justify-content: center;
	position: relative;
	@media screen and (max-width: 1200px) {
		width: 35vmin;
		height: 35vmin;
		margin: 1vmin auto;
	}
`;

const LinkNav = styled(Link)`
	height: 30vmin;
	text-decoration: none;
	display: flex;
	flex-direction: column;
`;

const ImageDiv = styled.div`
	max-width: 16vmin;
	height: 16vmin;
	margin-top: 6vmin;
	margin-left: 6.5vmin;
	overflow: hidden;
	&:hover {
		transform: scale(1.05);
		transition: all 0.3s;
		cursor: pointer;
	}
	@media screen and (max-width: 1200px) {
		max-width: 18vmin;
		height: 18vmin;
		margin-top: 4.75vmin;
		margin-left: 8vmin;
	}
`;

const IdolImage = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;

const LinkTxt = styled.div`
	/* outline: 2px solid blue; */
	width: 22vmin;
	color: #2d3436;
	text-align: center;
	margin-top: 1.5vmin;
	margin-right: 1vmin;
	align-self: center;
	@media screen and (max-width: 1200px) {
		font-size: 3vmin;
		margin-top: 2vmin;
	}
`;

const LinkTitle = styled.p`
	font-size: 2.5vmin;
	font-weight: 600;
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const LikeIcon = styled.img`
	width: 5vmin;
	height: 5vmin;
	margin-top: 1vmin;
	cursor: pointer;
	position: absolute;
	top: 0.75vmin;
	right: 3vmin;
	@media screen and (max-width: 1200px) {
		width: 6vmin;
		height: 6vmin;
	}
`;

function TopicContainer({ topic, item }) {
	const [follow, setFollow] = useState(false);
	const db = firebase.firestore();
	const user = firebase.auth().currentUser;
	const docRef = db.collection("categories");
	const previewURL = item.star.main_image
		? `${item.star.main_image}`
		: `${idol}`;

	useEffect(() => {
		docRef
			.where("title", "==", `${item.star.title}`)
			.where("followedBy", "array-contains", `${user.uid}`)
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					// doc.data() is never undefined for query doc snapshots
					const followedBy = doc.data().followedBy;
					const follow = followedBy.some((item) => {
						const result = item === user.uid;
						return result;
					});
					if (follow) {
						setFollow(true);
					} else {
						// doc.data() will be undefined in this case
						setFollow(false);
					}
				});
			})
			.catch((error) => {
				console.log("Error getting documents: ", error);
			});
	}, []);

	const AddtoMyFollow = () => {
		db.collection("users")
			.doc(`${user.uid}`)
			.collection("follows")
			.doc(`${item.star.title}`)
			.set({
				title: item.star.title,
				main_image: item.star.main_image,
				topic: item.star.topic,
			})
			.then(() => {
				// alert("追蹤成功🎉🎊");
				Swal.fire("追蹤成功");
			})
			.catch((error) => {
				console.error("Error adding document: ", error);
			});
	};

	const RemoveMyFollow = () => {
		db.collection("users")
			.doc(`${user.uid}`)
			.collection("follows")
			.doc(`${item.star.title}`)
			.delete()
			.then(() => {
				// alert("取消追蹤😤😤");
				Swal.fire("取消追蹤");
			})
			.catch((error) => {
				console.error("Error removing document: ", error);
			});
	};
	const AddtoFollowedBy = () => {
		docRef
			.doc(`${item.star.title}`)
			.update({
				followedBy: firebase.firestore.FieldValue.arrayUnion(`${user.uid}`),
			})
			.then(() => {
				// console.log(user.uid);
			});
	};
	const RemoveFollowedBy = () => {
		docRef
			.doc(`${item.star.title}`)
			.update({
				followedBy: firebase.firestore.FieldValue.arrayRemove(`${user.uid}`),
			})
			.then(() => {
				// console.log(user.uid);
			});
	};

	const ToggleFollow = () => {
		setFollow(!follow);
		if (follow === true) {
			RemoveMyFollow();
			RemoveFollowedBy();
		} else {
			AddtoMyFollow();
			AddtoFollowedBy();
		}
	};

	return (
		<EachIdol>
			<LinkNav to={`${topic}/${item.star.title}`}>
				<ImageDiv>
					<IdolImage src={previewURL} />
				</ImageDiv>
				<LinkTxt>
					<LinkTitle>{item.star.title}</LinkTitle>
				</LinkTxt>
			</LinkNav>
			<LikeIcon src={follow ? like : unlike} onClick={ToggleFollow} />
		</EachIdol>
	);
}

export default TopicContainer;
