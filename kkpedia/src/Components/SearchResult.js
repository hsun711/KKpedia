import React, { useEffect, useState } from "react";
import firebase from "../utils/firebase";
import algolia from "../utils/algolia";
import styled from "styled-components";
import Loading from "./Loading";
import board from "../img/cork-board.png";
import sticker from "../img/sticker2.png";
import idol from "../img/wanted.png";
import { Link, useParams, useHistory } from "react-router-dom";

const MainContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

const Container = styled.div`
	width: 80%;
	height: 100%;
	margin: 20vmin auto;
	background-image: url(${board});
	box-shadow: 10px 10px 30px 5px rgba(0, 0, 0, 0.25);
	border-radius: 10px;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	@media screen and (max-width: 1200px) {
		width: 90%;
	}
`;

const NoResult = styled.div`
	width: 80%;
	height: 30vmin;
	font-size: 8vmin;
	margin: 20vmin auto;
	background-color: rgba(256, 256, 256, 0.8);
	box-shadow: 10px 10px 30px 5px rgba(0, 0, 0, 0.25);
	border-radius: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	@media screen and (max-width: 1200px) {
		width: 90%;
		font-size: 5vmin;
	}
`;

const EachIdol = styled.div`
	background-image: url(${sticker});
	background-size: 100%;
	width: 30vmin;
	height: 30vmin;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const LinkNav = styled.div`
	width: 100%;
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
	max-width: 15vmin;
	height: 15vmin;
	margin-top: 2.75vmin;
	margin-right: 1.1vmin;
`;

const LinkTxt = styled.p`
	color: #2d3436;
	text-align: center;
	font-size: 2.5vmin;
	line-height: 2.5vmin;
	font-weight: 600;
	margin-top: 2.5vmin;
`;

function SearchResult({ allCategory }) {
	const history = useHistory();
	const { search } = useParams();
	const [resultData, setResultData] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		algolia.search(search).then((result) => {
			const ar = [];
			result.hits.map((hit) => {
				const result = allCategory.filter((data) => {
					return data.title === hit.title;
				});
				ar.push(...result);
			});
			setResultData(ar);
			setLoading(false);
		});
	}, [search]);

	return (
		<>
			{resultData.length === 0 ? (
				<NoResult>
					<p>此藝人/戲劇/綜藝還沒被建立唷!</p>
				</NoResult>
			) : (
				<Container>
					{resultData.map((result) => {
						return (
							<EachIdol key={result.title}>
								<LinkNav
									onClick={() => {
										history.push(`/${result.topic}/${result.title}`);
									}}
								>
									<IdolImage src={result.main_image || idol} />
									<LinkTxt>{result.title}</LinkTxt>
								</LinkNav>
							</EachIdol>
						);
					})}
				</Container>
			)}
			{/* <Container>
				{resultData.map((result) => {
					return (
						<EachIdol key={result.title}>
							<LinkNav
								onClick={() => {
									history.push(`/${result.topic}/${result.title}`);
								}}
							>
								<IdolImage src={result.main_image || idol} />
								<LinkTxt>{result.title}</LinkTxt>
							</LinkNav>
						</EachIdol>
					);
				})}
			</Container> */}
			{loading && <Loading />}
		</>
	);
}

export default SearchResult;
