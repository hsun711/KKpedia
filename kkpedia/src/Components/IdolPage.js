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
import check from "../img/checked.png";
import changeimg from "../img/camera.png";
import add from "../img/add.png";

const Container = styled.div`
	width: 70%;
	height: 100%;
	margin: 10vmin auto;
	padding-bottom: 7vmin;
	@media screen and (max-width: 992px) {
		margin: 90px auto;
	}
`;

const ColumnDiv = styled.div`
	min-width: 20vmin;
	display: flex;
	flex-direction: column;
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
	@media screen and (max-width: 992px) {
		font-size: 5vmin;
	}
`;
const SnsLink = styled.a`
	/* margin-left: 2.5vmin; */
	list-style: none;
	margin-top: 2.5vmin;
	cursor: pointer;
`;

const SnsImg = styled.img`
	width: 3vmin;
`;

const Edit = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const EditIcon = styled.img`
	width: 3vmin;
	margin-top: 2vmin;
	cursor: pointer;
`;

const Photo = styled.div`
	display: flex;
	position: relative;
	height: 15vmin;
`;

const PersonImage = styled.img`
	margin-left: 2vmin;
	max-width: 100%;
	max-height: 100%;
	border-radius: 10%;
`;

const PhotoChange = styled.div`
	background-image: url(${changeimg});
	background-repeat: no-repeat;
	background-size: 100%;
	width: 3vmin;
	height: 3vmin;
	cursor: pointer;
	margin-right: 1vmin;
	position: absolute;
	bottom: -1vmin;
	right: -2vmin;
`;

const PhotoCheck = styled(PhotoChange)`
	background-image: url(${check});
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
	flex-wrap: wrap;
	margin-top: 5vmin;
	padding: 4vmin;
`;

function IdolPage({ topic }) {
	let { path, url } = useRouteMatch();
	let { title } = useParams();
	const [sns, setSns] = useState([]);
	const [mainImage, setMainImage] = useState("");
	const [photoChange, setPhotoChange] = useState(false);
	const [followUsers, setFollowUsers] = useState([]);
	const [file, setFile] = useState(null);
	const db = firebase.firestore();
	const docRef = db.collection("categories");
	const previewURL = file ? URL.createObjectURL(file) : mainImage;

	useEffect(() => {
		docRef.where("title", "==", `${title}`).onSnapshot((querySnapshot) => {
			const item = [];
			querySnapshot.forEach((doc) => {
				// doc.data() is never undefined for query doc snapshots
				item.push({ star: doc.data() });
			});
			setSns(item);
			setMainImage(item[0].star.main_image);
		});

		db.collection("categories")
			.doc(`${title}`)
			.get()
			.then((doc) => {
				setFollowUsers(doc.data().followedBy);
			});
	}, []);
	// console.log(title);

	const ChangeOk = () => {
		setPhotoChange(false);
		const fileRef = firebase.storage().ref(`cover_images/${title}`);
		const metadata = {
			contentType: file.type,
		};
		fileRef.put(file, metadata).then(() => {
			fileRef.getDownloadURL().then((imageUrl) => {
				docRef.doc(`${title}`).update({
					main_image: `${imageUrl}`,
				});

				followUsers.forEach((user) => {
					db.collection("users")
						.doc(`${user}`)
						.collection("follows")
						.doc(`${title}`)
						.update({
							main_image: `${imageUrl}`,
						});
				});
			});
		});
		alert("更新成功🎊🎊");
	};

	const AddSns = (sns) => {
		if (sns === "facebook") {
			const url = prompt(`請輸入${sns}網址`);
			if (url === null) {
				url = "";
			} else {
				docRef.doc(`${title}`).update({
					facebook: `${url}`,
				});
			}
		} else if (sns === "instagram") {
			const url = prompt(`請輸入${sns}網址`);
			if (url === null) {
				url = "";
			} else {
				docRef.doc(`${title}`).update({
					instagram: `${url}`,
				});
			}
		} else if (sns === "twitter") {
			const url = prompt(`請輸入${sns}網址`);
			if (url === null) {
				url = "";
			} else {
				docRef.doc(`${title}`).update({
					twitter: `${url}`,
				});
			}
		} else if (sns === "youtube") {
			const url = prompt(`請輸入${sns}網址`);
			if (url === null) {
				url = "";
			} else {
				docRef.doc(`${title}`).update({
					youtube: `${url}`,
				});
			}
		}
	};

	return (
		<>
			<Container>
				<BrowserRouter>
					<>
						<Person>
							<ColumnDiv>
								<PersonName>{title}</PersonName>
								<>
									{sns.map((item) => {
										return (
											<Edit key={item.star.title}>
												{item.star.facebook === "" ? (
													<EditIcon
														src={add}
														onClick={() => {
															AddSns("facebook");
														}}
													/>
												) : (
													<SnsLink href={item.star.facebook} target="_blank">
														<SnsImg src={fb} />
													</SnsLink>
												)}
												{item.star.instagram === "" ? (
													<EditIcon
														src={add}
														onClick={() => {
															AddSns("instagram");
														}}
													/>
												) : (
													<SnsLink href={item.star.instagram} target="_blank">
														<SnsImg src={ig} />
													</SnsLink>
												)}
												{item.star.twitter === "" ? (
													<EditIcon
														src={add}
														onClick={() => {
															AddSns("twitter");
														}}
													/>
												) : (
													<SnsLink href={item.star.twitter} target="_blank">
														<SnsImg src={twitter} />
													</SnsLink>
												)}
												{item.star.youtube === "" ? (
													<EditIcon
														src={add}
														onClick={() => {
															AddSns("youtube");
														}}
													/>
												) : (
													<SnsLink href={item.star.youtube} target="_blank">
														<SnsImg src={youtube} onClick={AddSns} />
													</SnsLink>
												)}
											</Edit>
										);
									})}
								</>
							</ColumnDiv>

							<Photo>
								<PersonImage src={previewURL || idolimage} />
								{photoChange ? (
									<PhotoCheck
										as="label"
										htmlFor="uploadCover"
										onClick={ChangeOk}
									/>
								) : (
									<PhotoChange as="label" htmlFor="uploadCover" />
								)}
								<input
									type="file"
									id="uploadCover"
									style={{ display: "none" }}
									onChange={(e) => {
										setFile(e.target.files[0]);
										setPhotoChange(true);
									}}
								/>
							</Photo>
						</Person>

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
									<Place title={title} topic={topic} />
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
								<Route path={`${url}/:location`}>
									<EachLocation title={title} />
								</Route>
							</Switch>
						</PlaceContainer>
					</>
				</BrowserRouter>
			</Container>
		</>
	);
}

export default IdolPage;
