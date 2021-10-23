import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TopicContainer from "./TopicContainer";
import add from "../img/plus.png";
import NewOne from "./NewOne";

const MainContainer = styled.div`
	width: 100%;
	display: flex;
`;

const Add = styled.div`
	background-image: url(${add});
	background-repeat: no-repeat;
	background-size: 100%;
	width: 7vmin;
	height: 7vmin;
	position: fixed;
	bottom: 3vmin;
	right: 3vmin;
	cursor: pointer;
`;

const Cover = styled.div`
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	background-color: black;
	opacity: 0.8;
	z-index: 2;
`;

function Idol() {
	const [titleName, setTitileName] = useState("Running Man");
	const [popAddOne, setPopAddOne] = useState(false);

	const AddSomeOne = () => {
		setPopAddOne(!popAddOne);
	};
	return (
		<MainContainer>
			<Add onClick={AddSomeOne} />
			{popAddOne ? (
				<div>
					<Cover onClick={AddSomeOne} />
					<NewOne topic="TV Show" />
				</div>
			) : (
				<TopicContainer topic="TV Show" title={titleName} />
			)}
		</MainContainer>
	);
}

export default Idol;
