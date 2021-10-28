import React from "react";
import styled from "styled-components";
import firebase from "../utils/firebase";
import mainImage from "../img/wanted.png";

const Container = styled.div`
	width: 80vmin;
	background-color: beige;
	position: fixed;
	top: 50%;
	left: 50%;
	margin-left: -40vmin;
	margin-top: -40vh;
	padding: 5vmin 7vmin;
	display: flex;
	flex-direction: column;
	z-index: 5;
`;

const CommentArea = styled.div`
	width: 95%;
	display: flex;
	flex-direction: column;
	margin: 0px auto;
`;

const Comment = styled.div`
	padding: 2vmin;
	background-color: #dfe6e9;
	border-radius: 10px;
	display: flex;
	margin-bottom: 2vmin;
`;

const CommentUser = styled.img`
	width: 3vmin;
	height: 3vmin;
	border-radius: 50%;
	outline: 1px solid black;
`;
const CommentTxt = styled.div`
	padding: 0px 2vmin;
	position: relative;
`;

const NormalTxt = styled.p`
	font-size: 2vmin;
`;

const TimeStamp = styled.p`
	font-size: 1vmin;
	position: absolute;
	bottom: -1vmin;
	right: 0px;
`;

function LookMore() {
	const db = firebase.firestore();

	return (
		<Container>
			<CommentArea>
				<Comment>
					<CommentUser src={mainImage} />
					<CommentTxt>
						<NormalTxt>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eu
							placerat urna, quis tincidunt lectus.
						</NormalTxt>
						<TimeStamp>2021/10/23</TimeStamp>
					</CommentTxt>
				</Comment>
				<Comment>
					<CommentUser src={mainImage} />
					<CommentTxt>
						<NormalTxt>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eu
							placerat urna, quis tincidunt lectus.
						</NormalTxt>
						<TimeStamp>2021/10/23</TimeStamp>
					</CommentTxt>
				</Comment>
			</CommentArea>
		</Container>
	);
}

export default LookMore;
