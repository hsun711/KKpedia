import React, { useEffect, useState } from "react";
import firebase from "../utils/firebase";
import styled from "styled-components";
import sticker from "../img/sticker.png";
import idol from "../img/wanted.png";
import unlike from "../img/unlike.png";
import like from "../img/like.png";
import { Link } from "react-router-dom";

const EachIdol = styled.div`
	background-image: url(${sticker});
	background-size: 100%;
	width: 20vmin;
	height: 20vmin;
	margin: 4vmin 5vmin;
	padding: 0px 3vmin;
	display: flex;
	flex-direction: column;
	justify-content: center;
	position: relative;
`;

const LinkNav = styled(Link)`
	text-decoration: none;
	display: flex;
	flex-direction: column;
	justify-content: center;
	&:hover {
		transform: scale(1.1);
		transition: all 0.3s;
		cursor: pointer;
	}
`;

const IdolImage = styled.img`
	align-self: center;
	width: 10vmin;
	/* height: 10vmin; */
`;

const LinkTxt = styled.p`
	color: #2d3436;
	text-align: center;
	font-size: 2.5vmin;
	font-weight: 600;
`;

const LikeIcon = styled.img`
	width: 3vmin;
	height: 3vmin;
	margin-top: 1vmin;
	cursor: pointer;
	position: absolute;
	bottom: 0.75vmin;
	right: 0.75vmin;
`;

function TopicContainer({ topic, item }) {
	// const [titleName, setTitileName] = useState([]);
	const [follow, setFollow] = useState(false);
	const db = firebase.firestore();
	const user = firebase.auth().currentUser;
	const docRef = db.collection("categories");
	const previewURL = item.star.main_image
		? `${item.star.main_image}`
		: `${idol}`;

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
				alert("追蹤成功🎉🎊");
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
				alert("取消追蹤😤😤");
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

	return (
		<EachIdol>
			<LinkNav to={`${topic}/${item.star.title}`}>
				<LinkTxt>{item.star.title}</LinkTxt>
				<IdolImage src={previewURL} />
			</LinkNav>
			<LikeIcon src={follow ? like : unlike} onClick={ToggleFollow} />
		</EachIdol>
	);
}

export default TopicContainer;
