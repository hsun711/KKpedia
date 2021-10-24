import React, { useEffect, useState } from "react";
import styled from "styled-components";
import idolimage from "../img/wanted.png";
import { useParams } from "react-router-dom";
import send from "../img/submit.png";
import good from "../img/thumbs-up.png";
import comment from "../img/comment.png";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	background-color: beige;
	width: 100%;
	padding: 5vmin 7vmin;
	border-radius: 10px;
`;
const Title = styled.p`
	font-size: 4vmin;
	font-weight: 600;
	margin-bottom: 2vmin;
`;

const TextArea = styled.textarea`
	width: 90%;
	height: 10vmin;
	margin-left: 4vmin;
	border-radius: 7px;
	padding: 1vmin;
	align-self: center;
`;

const Send = styled.div`
	background-image: url(${send});
	background-size: 90%;
	background-repeat: no-repeat;
	width: 10vmin;
	height: 10vmin;
	border-radius: 10px;
	margin-left: 90%;
	cursor: pointer;
	&:hover {
		background-position-x: 2px;
		background-position-y: 2px;
	}
`;

const CommentArea = styled.div`
	width: 80vmin;
	align-self: center;
	outline: 1px solid black;
	display: flex;
	flex-direction: column;
	padding: 3vmin;
	border-radius: 10px;
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
	padding: 2vmin;
	background-color: #dfe6e9;
	margin-left: 1vmin;
	border-radius: 10px;
`;

const InputReply = styled.textarea`
	border-radius: 10px;
	height: 5vmin;
	padding: 1vmin;
`;

const Submit = styled(Send)`
	width: 6vmin;
	height: 5vmin;
`;

function Place() {
	// let { category } = useParams();
	return (
		<Container>
			<Title>Create a Post</Title>
			<TextArea />
			<Send />
			<CommentArea>
				<PosterDetail>
					<PosterImage src={idolimage} />
					<PosterText>
						<h3>UserId</h3>
						<p>2021/10/20</p>
					</PosterText>
				</PosterDetail>
				<hr />
				<Comment>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eu
						placerat urna, quis tincidunt lectus. Cras id ligula id mauris
						luctus fermentum. Lorem ipsum dolor sit amet.
					</p>
				</Comment>
				<hr />
				<Icon>
					<EachIcon src={good} />
					<GoodTotal>10</GoodTotal>
					<EachIcon src={comment} />
				</Icon>
				<Recomment>
					<ReplyImg src={idolimage} />
					<ReplyComment>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eu
							placerat urna, quis tincidunt lectus. Cras id ligula id mauris
							luctus fermentum. Lorem ipsum dolor sit amet.
						</p>
					</ReplyComment>
				</Recomment>
				<Recomment>
					<ReplyImg src={idolimage} />
					<ReplyComment>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eu
							placerat urna, quis tincidunt lectus. Cras id ligula id mauris
							luctus fermentum. Lorem ipsum dolor sit amet.
						</p>
					</ReplyComment>
				</Recomment>
				<InputReply />
				<Submit />
			</CommentArea>
		</Container>
	);
}

export default Place;
