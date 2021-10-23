import React, { useEffect, useState } from "react";
import styled from "styled-components";
import idolimage from "../img/wanted.png";
import { useParams } from "react-router-dom";

const EachPlace = styled.div`
	display: flex;
	background-color: beige;
	padding: 10px;
	width: 20vmin;
	height: 13vmin;
	border-radius: 10px;
	align-items: center;
`;

const PlaceImage = styled.img`
	width: 10vmin;
	height: 10vmin;
`;

const PlaceText = styled.div`
	height: 10vmin;
	margin-left: 0.5vmin;
`;
const PlaceDesp = styled.p`
	margin-top: 1vmin;
`;

function Place() {
	// let { category } = useParams();
	return (
		<EachPlace>
			<PlaceImage src={idolimage} />
			<PlaceText>
				<h3>Picture</h3>
				<PlaceDesp>哈哈哈哈哈哈哈哈</PlaceDesp>
			</PlaceText>
		</EachPlace>
	);
}

export default Place;
