import React, { useEffect, useState } from "react";
import styled from "styled-components";
import idolimage from "../img/wanted.png";
import {
	BrowserRouter,
	Route,
	Link,
	Switch,
	useParams,
	useRouteMatch,
} from "react-router-dom";
import add from "../img/plus.png";
import NewPlace from "./NewPlace";

const Container = styled.div`
	display: flex;
	background-color: beige;
	padding: 10px;
	/* width: 20vmin;
	height: 13vmin; */
	border-radius: 10px;
	align-items: center;
`;

const PlaceLink = styled(Link)`
	text-decoration: none;
	color: black;
`;

const EachPlace = styled.div`
	width: 100%;
	display: flex;
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

function Place({ title }) {
	// let { category } = useParams();
	const [popAddPlace, setPopAddPlace] = useState(false);
	const [placeName, setPlaceName] = useState("南山塔");

	const AddSomePlace = () => {
		setPopAddPlace(!popAddPlace);
	};
	return (
		<Container>
			<Add onClick={AddSomePlace} topic="Idol" />
			{popAddPlace ? (
				<div>
					<Cover onClick={AddSomePlace} />
					<NewPlace title={title} />
				</div>
			) : (
				<PlaceLink to={`/place/${placeName}`}>
					<EachPlace>
						<PlaceImage src={idolimage} />
						<PlaceText>
							<h3>{placeName}</h3>
							<PlaceDesp>哈哈哈哈哈哈</PlaceDesp>
						</PlaceText>
					</EachPlace>
				</PlaceLink>
			)}
		</Container>
	);
}

export default Place;
