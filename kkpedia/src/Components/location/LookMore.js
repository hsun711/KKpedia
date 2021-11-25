import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import firebase from "../../utils/firebase";
import mainImage from "../../img/wanted.png";
import star from "../../img/star.png";
import notebook from "../../img/20800062.png";

const Container = styled.div`
	width: 80vmin;
	max-height: 90vmin;
	background-image: url(${notebook});
	background-repeat: no-repeat;
	background-size: 100% 100%;
	border-radius: 10px;
	position: fixed;
	top: 50%;
	left: 50%;
	margin-left: -40vmin;
	margin-top: -45vmin;
	padding: 3vmin 7vmin;
	display: flex;
	flex-direction: column;
	z-index: 5;
	overflow-y: scroll;
	&::-webkit-scrollbar {
		width: 16px;
	}
	&::-webkit-scrollbar-track {
		background: rgba(256, 256, 256, 0);
	}
	&::-webkit-scrollbar-thumb {
		background-color: rgba(256, 256, 256, 0);
		border-radius: 10px;
		border: 3px solid rgba(256, 256, 256, 0);
	}
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
		const unsubscribe = docRef
			.doc(`${title}`)
			.collection("reviews")
			.where("locationName", "==", `${location}`)
			.orderBy("timestamp", "desc")
			.onSnapshot((querySnapshot) => {
				const item = [];
				querySnapshot.forEach((doc) => {
					item.push(doc.data());
				});
				setComment(item);
			});
		return () => unsubscribe();
	}, []);

	return (
		<Container>
			<CommentArea>
				{comment.length === 0 ? (
					<h3>還沒有人評論喔</h3>
				) : (
					<>
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
					</>
				)}
			</CommentArea>
		</Container>
	);
}

export default LookMore;
