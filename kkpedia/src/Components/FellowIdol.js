import React, { useState } from "react";
import styled from "styled-components";
import image from "../img/wanted.png";
import unlike from "../img/unlike.png";
import like from "../img/like.png";

const EachFellow = styled.div`
	margin-right: 1vmin;
	padding: 1vmin;
	display: flex;
	flex-direction: column;
	align-items: center;
	/* outline: 1px solid black; */
`;

const EachStar = styled.div`
	display: flex;
	align-items: center;
`;
const PerStar = styled.img`
	width: 7vmin;
	height: 7vmin;
`;

const LikeIcon = styled.img`
	width: 2vmin;
	height: 2vmin;
	margin-left: 1vmin;
	cursor: pointer;
`;

const NormalTxt = styled.p`
	font-size: 2vmin;
`;

function FellowIdol() {
	const [favorite, setFavorite] = useState(true);
	const AddtoFavorite = () => {
		setFavorite(!favorite);
	};
	return (
		<EachFellow>
			<PerStar src={image} />
			<EachStar>
				<NormalTxt>南山塔</NormalTxt>
				<LikeIcon src={favorite ? like : unlike} onClick={AddtoFavorite} />
			</EachStar>
		</EachFellow>
	);
}

export default FellowIdol;
