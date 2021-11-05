import React, { useEffect, useState } from "react";
import firebase from "../utils/firebase";
import algolia from "../utils/algolia";
import styled from "styled-components";
import board from "../img/cork-board.png";
import sticker from "../img/sticker.png";
import idol from "../img/wanted.png";
import { Link, useParams } from "react-router-dom";

const MainContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

const Container = styled.div`
	width: 70%;
	height: 100%;
	margin: 20vmin auto;
	padding: 5vmin 0px;
	background-image: url(${board});
	display: flex;
	/* justify-content: center; */
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
	/* height: 10vmin; */
`;

const LinkTxt = styled.p`
	color: #2d3436;
	text-align: center;
	font-size: 2.5vmin;
	font-weight: 600;
`;

function SearchResult() {
	const { search } = useParams();
	const [searchReasult, setSearchReasult] = useState([]);

	useEffect(() => {
		algolia.search(search).then((result) => {
			// console.log(result);
			const searchReasults = result.hits.map((hit) => {
				return {
					title: hit.title,
					objectId: hit.objectID,
					main_image: hit.main_image,
				};
			});
			setSearchReasult(searchReasults);
		});
	}, []);
	return (
		<MainContainer>
			<Container>
				{searchReasult.map((item) => {
					return (
						<EachIdol key={item.objectId}>
							<LinkNav>
								<LinkTxt>{item.title}</LinkTxt>
								<IdolImage src={item.main_image || idol} />
							</LinkNav>
						</EachIdol>
					);
				})}
			</Container>
		</MainContainer>
	);
}

export default SearchResult;
