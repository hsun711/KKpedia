import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import firebase from "../utils/firebase";
import mainImage from "../img/wanted.png";
import star from "../img/star.png";
import notepaper from "../img/assortment.png";
import comentpaper from "../img/678.png";
import notebook from "../img/20800062.jpg";

const Container = styled.div`
	width: 80vmin;
	max-height: 90vmin;
	background-image: url(${notebook});
	background-repeat: no-repeat;
	background-size: 100% 100%;
	border-radius: 10px;
	position: fixed;
	overflow-y: scroll;
	top: 50%;
	left: 50%;
	margin-left: -40vmin;
	margin-top: -45vmin;
	padding: 3vmin 7vmin;
	display: flex;
	flex-direction: column;
	z-index: 5;
	@media screen and (max-width: 1200px) {
		margin-top: -40vmin;
		max-height: 85vmin;
	}
`;

const CommentArea = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	margin: 2vmin auto;
	/* outline: 5px solid black; */
`;

const Comment = styled.div`
	padding: 2vmin;
	background-color: rgba(240, 225, 186, 0.8);
	box-shadow: 10px 10px 30px 5px rgba(0, 0, 0, 0.2);
	border-radius: 10px;
	display: flex;
	margin-top: 2.1vmin;
`;

const CommentUser = styled.img`
	width: 4vmin;
	height: 4vmin;
	border-radius: 50%;
	outline: 1px solid black;
`;

const CommentTxtArea = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

const CommentTxt = styled.div`
	padding: 0px 2vmin;
	display: flex;
	flex-direction: column;
`;

const NormalTxt = styled.p`
	font-size: 2.5vmin;
`;
const Score = styled.div`
	background-image: url(${star});
	background-repeat: no-repeat;
	background-size: 100%;
	width: 2.5vmin;
	height: 2.5vmin;
	margin-bottom: 1vmin;
`;

const ScoreTxt = styled.p`
	font-size: 2.5vmin;
	font-weight: 600;
	margin-left: 3.2vmin;
`;

const TimeStamp = styled.div`
	font-size: 1vmin;
	margin-top: 1vmin;
	align-self: flex-end;
`;

function LookMore({ title, location }) {
	const db = firebase.firestore();
	const docRef = db.collection("categories");
	const [comment, setComment] = useState([]);

	useEffect(() => {
		docRef
			.doc(`${title}`)
			.collection("reviews")
			.where("locationName", "==", `${location}`)
			.orderBy("timestamp", "desc")
			.onSnapshot((querySnapshot) => {
				const item = [];
				querySnapshot.forEach((doc) => {
					// console.log(doc.data());
					item.push(doc.data());
					// setComment([doc.data()]);
				});
				setComment(item);
			});
	}, []);

	return (
		<Container>
			<CommentArea>
				{comment.map((data) => {
					const time = data.timestamp;
					return (
						<Comment key={uuidv4()}>
							<CommentUser src={data.postUserImg || mainImage} />
							<CommentTxtArea>
								<CommentTxt>
									<Score>
										<ScoreTxt>{data.score}</ScoreTxt>
									</Score>
									<NormalTxt>{data.comment}</NormalTxt>
								</CommentTxt>
								<TimeStamp>{new Date(time).toLocaleString()}</TimeStamp>
							</CommentTxtArea>
						</Comment>
					);
				})}
			</CommentArea>
		</Container>
	);
}

export default LookMore;
