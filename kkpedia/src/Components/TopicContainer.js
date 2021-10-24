import React, { useEffect, useState } from "react";
import styled from "styled-components";
import sticker from "../img/sticker.png";
import board from "../img/cork-board.png";
import idol from "../img/wanted.png";
import { Link, useRouteMatch, Route } from "react-router-dom";

const Container = styled.div`
	width: 70%;
	height: 100%;
	margin: 20vmin auto;
	padding: 5vmin 0px;
	background-image: url(${board});
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	@media screen and (max-width: 992px) {
		margin: 90px auto;
	}
`;

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
	height: 10vmin;
`;

const LinkTxt = styled.p`
	color: #2d3436;
	text-align: center;
	font-size: 2.5vmin;
	font-weight: 600;
`;

function TopicContainer({ topic, title }) {
	let { path, url } = useRouteMatch();
	const [titleName, setTitileName] = useState(title);

	return (
		<Container>
			<EachIdol>
				<LinkNav to={`${titleName}`}>
					<LinkTxt>{titleName}</LinkTxt>
					<IdolImage src={idol} />
				</LinkNav>
			</EachIdol>
			<EachIdol>
				<LinkNav to={`${titleName}`}>
					<LinkTxt>{titleName}</LinkTxt>
					<IdolImage src={idol} />
				</LinkNav>
			</EachIdol>
			<EachIdol>
				<LinkNav to={`${titleName}`}>
					<LinkTxt>{titleName}</LinkTxt>
					<IdolImage src={idol} />
				</LinkNav>
			</EachIdol>
			<EachIdol>
				<LinkNav to={`${titleName}`}>
					<LinkTxt>{titleName}</LinkTxt>
					<IdolImage src={idol} />
				</LinkNav>
			</EachIdol>
			<EachIdol>
				<LinkNav to={`${titleName}`}>
					<LinkTxt>{titleName}</LinkTxt>
					<IdolImage src={idol} />
				</LinkNav>
			</EachIdol>
			<EachIdol>
				<LinkNav to={`${titleName}`}>
					<LinkTxt>{titleName}</LinkTxt>
					<IdolImage src={idol} />
				</LinkNav>
			</EachIdol>
			<EachIdol>
				<LinkNav to={`${titleName}`}>
					<LinkTxt>{titleName}</LinkTxt>
					<IdolImage src={idol} />
				</LinkNav>
			</EachIdol>
		</Container>
	);
}

export default TopicContainer;