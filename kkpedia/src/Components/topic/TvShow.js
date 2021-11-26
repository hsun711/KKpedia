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

function TvShow() {
	const [popAddOne, setPopAddOne] = useState(false);
	const [titleName, setTitileName] = useState([]);

	const AddSomeOne = () => {
		setPopAddOne(!popAddOne);
	};

	useEffect(() => {
		const unsubscribe = getTopicData("tvshow", setTitileName);
		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<>
			{popAddOne ? (
				<div>
					<Cover onClick={AddSomeOne} />
					<NewOne topic="tvshow" setPopAddOne={setPopAddOne} />
				</div>
			) : (
				<Container>
					<TitleDiv>
						<TopicTitle>綜藝</TopicTitle>
						<Add onClick={AddSomeOne}>新增</Add>
					</TitleDiv>
					<EachContainer>
						{titleName.map((item) => {
							return (
								<TopicContainer topic="tvshow" item={item} key={item.title} />
							);
						})}
					</EachContainer>
				</Container>
			)}
		</>
	);
}

export default TvShow;
