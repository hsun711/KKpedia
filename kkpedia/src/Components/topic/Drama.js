import React, { useState, useEffect } from "react";
import TopicContainer from "./TopicContainer";
import NewOne from "./NewOne";
import { getTopicData } from "../../utils/firebaseFunc";
import {
	TitleDiv,
	TopicTitle,
	Add,
	Cover,
	Container,
	EachContainer,
} from "../../style/topicPage";

function Drama() {
	const [popAddOne, setPopAddOne] = useState(false);
	const [titleName, setTitileName] = useState([]);

	const AddSomeOne = () => {
		setPopAddOne(!popAddOne);
	};

	useEffect(() => {
		const unsubscribe = getTopicData("drama", setTitileName);

		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<>
			{popAddOne ? (
				<div>
					<Cover onClick={AddSomeOne} />
					<NewOne topic="drama" setPopAddOne={setPopAddOne} />
				</div>
			) : (
				<Container>
					<TitleDiv>
						<TopicTitle>戲劇</TopicTitle>
						<Add onClick={AddSomeOne}>新增</Add>
					</TitleDiv>
					<EachContainer>
						{titleName.map((item) => {
							return (
								<TopicContainer topic="drama" item={item} key={item.title} />
							);
						})}
					</EachContainer>
				</Container>
			)}
		</>
	);
}

export default Drama;
