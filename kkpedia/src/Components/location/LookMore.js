import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import notebook from "../../img/20800062.png";
import EachComment from "./EachComment";
import { getAllReviews } from "../../utils/firebaseFunc";

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

function LookMore({ title, location }) {
	const [comment, setComment] = useState([]);

	useEffect(() => {
		const unsubscribe = getAllReviews(title, location, setComment);

		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<Container>
			<CommentArea>
				{comment.length === 0 ? (
					<h3>還沒有人評論喔</h3>
				) : (
					<>
						{comment.map((data) => {
							return <EachComment data={data} key={uuidv4()} />;
						})}
					</>
				)}
			</CommentArea>
		</Container>
	);
}

export default LookMore;
