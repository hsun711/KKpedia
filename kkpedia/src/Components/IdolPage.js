import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
	BrowserRouter,
	Route,
	Link,
	Switch,
	useParams,
	useRouteMatch,
} from "react-router-dom";
import Place from "./Place";
import Picture from "./Picture";
import Calender from "./Calender";
import Post from "./Post";
import EachLocation from "./EachLocation";
import firebase from "../utils/firebase";
import idolimage from "../img/wanted.png";
import fb from "../img/facebook.png";
import ig from "../img/instagram.png";
import twitter from "../img/twitter.png";
import youtube from "../img/youtube.png";
import board from "../img/cork-board.png";
import pin from "../img/pin-map.png";
import pictures from "../img/pictures.png";
import schedule from "../img/schedule.png";
import comment from "../img/comment.png";
import add from "../img/plus.png";

const MainContainer = styled.div`
	width: 100%;
	display: flex;
`;

const Container = styled.div`
	width: 90%;
	height: 100%;
	margin-top: 100px;
	margin-left: 30vmin;
	margin-right: 90px;
	padding-bottom: 7vmin;
	@media screen and (max-width: 992px) {
		margin: 90px auto;
	}
`;

const Person = styled.div`
	margin-top: 30px;
	margin-left: 30px;
	display: flex;
	align-items: center;
`;

const PersonName = styled.p`
	font-size: 4vmin;
	text-align: center;
	align-self: center;
`;

const PersonImage = styled.img`
	margin-left: 2vmin;
	width: 5vmin;
	height: 5vmin;
	border-radius: 50%;
`;

const SnsIconUl = styled.ul`
	display: flex;
	margin-left: 10px;
`;

const SnsLink = styled.a`
	margin-left: 2.5vmin;
	list-style: none;
	margin-top: 2.5vmin;
	cursor: pointer;
`;

const SnsImg = styled.img`
	width: 2.3vmin;
`;

const MenuBar = styled.div`
	margin-top: 7vmin;
	display: flex;
`;

const MenuImage = styled.img`
	width: 2vmin;
`;

const MenuLink = styled(Link)`
	font-size: 2vmin;
	font-weight: 600;
	margin-right: 3vmin;
	text-decoration: none;
	color: black;
`;

const PlaceContainer = styled.div`
	background-image: url(${board});
	display: flex;
	margin-top: 5vmin;
	padding: 4vmin;
`;

function IdolPage() {
	let { path, url } = useRouteMatch();
	let { title } = useParams();
	const [sns, setSns] = useState([]);

	const db = firebase.firestore();
	const docRef = db.collection("categories");

	useEffect(() => {
		docRef
			.where("title", "==", `${title}`)
			.get()
			.then((querySnapshot) => {
				const item = [];
				querySnapshot.forEach((doc) => {
					// doc.data() is never undefined for query doc snapshots
					item.push({ star: doc.data() });
				});
				setSns(item);
			})
			.catch((error) => {
				console.log("Error getting documents: ", error);
			});
	}, []);
	// console.log(title);
	return (
		<MainContainer>
			<Container>
				<BrowserRouter>
					<Person>
						<PersonName>{title}</PersonName>
						<PersonImage src={idolimage} />
					</Person>

					{sns.map((item) => {
						return (
							<SnsIconUl key={item.star.title}>
								<SnsLink href={item.star.facebook} target="_blank">
									<SnsImg src={fb} />
								</SnsLink>
								<SnsLink href={item.star.instagram} target="_blank">
									<SnsImg src={ig} />
								</SnsLink>
								<SnsLink href={item.star.twitter} target="_blank">
									<SnsImg src={twitter} />
								</SnsLink>
								<SnsLink href={item.star.youtube} target="_blank">
									<SnsImg src={youtube} />
								</SnsLink>
							</SnsIconUl>
						);
					})}

					<MenuBar>
						<MenuLink to={`${url}`}>
							<MenuImage src={pin} />
							聖地
						</MenuLink>
						<MenuLink to={`${url}/picture`}>
							<MenuImage src={pictures} />
							圖片區
						</MenuLink>
						<MenuLink to={`${url}/calender`}>
							<MenuImage src={schedule} />
							日程表
						</MenuLink>
						<MenuLink to={`${url}/post`}>
							<MenuImage src={comment} />
							留言區
						</MenuLink>
					</MenuBar>
					<PlaceContainer>
						<Switch>
							<Route exact path={`${url}`}>
								<Place title={title} />
							</Route>
							<Route exact path={`${url}/picture`}>
								<Picture title={title} />
							</Route>
							<Route exact path={`${url}/calender`}>
								<Calender title={title} />
							</Route>
							<Route exact path={`${url}/post`}>
								<Post title={title} />
							</Route>
							<Route exact path={`/place/:location`}>
								<EachLocation title={title} />
							</Route>
						</Switch>
					</PlaceContainer>
				</BrowserRouter>
			</Container>
		</MainContainer>
	);
}

export default IdolPage;
