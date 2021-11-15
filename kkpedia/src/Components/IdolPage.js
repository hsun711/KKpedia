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
import Swal from "sweetalert2";
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
import check from "../img/checked.png";
import changeimg from "../img/photo-camera.png";
import add from "../img/add.png";
import initbanner from "../img/NightSky.png";

const BannerArea = styled.div`
	display: flex;
	flex-direction: column;
`;

const Banner = styled.div`
	width: 100%;
	height: 40vmin;
	background-image: url(${(props) => props.imgCover});
	background-repeat: no-repeat;
	background-color: black;
	background-position: center 45%;
	background-size: 100% auto;
	border-radius: 0px 0px 10px 10px;
`;

const BannerChange = styled.div`
	align-self: flex-end;
	background-image: url(${changeimg});
	background-repeat: no-repeat;
	background-size: 60%;
	background-position: center center;
	background-color: #3a3b3c;
	border-radius: 50%;
	width: 4vmin;
	height: 4vmin;
	cursor: pointer;
	margin-top: -5vmin;
	margin-right: 1vmin;
`;

const BannerCheck = styled(BannerChange)`
	background-image: url(${check});
	background-color: rgba(0, 0, 0, 0);
`;

const Container = styled.div`
	width: 95%;
	height: 100%;
	margin: -1vmin auto;
	padding-bottom: 7vmin;
	/* border: 2px solid black; */
	@media screen and (max-width: 1200px) {
		width: 100%;
		margin: auto;
	}
`;

const ColumnDiv = styled.div`
	align-self: flex-end;
	min-width: 25vmin;
	display: flex;
	flex-direction: column;
`;

const Person = styled.div`
	display: flex;
	align-items: center;
	@media screen and (max-width: 1200px) {
		justify-content: center;
		margin-top: 3vmin;
	}
`;

const PersonName = styled.p`
	font-size: 4.5vmin;
	font-weight: 600;
	text-align: center;
	align-self: center;
	@media screen and (max-width: 1200px) {
		font-size: 6vmin;
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
	@media screen and (max-width: 1200px) {
		width: 4vmin;
	}
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
	@media screen and (max-width: 1200px) {
		width: 4vmin;
	}
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
	background-size: 60%;
	background-position: center center;
	background-color: #3a3b3c;
	border-radius: 50%;
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
	@media screen and (max-width: 1200px) {
		justify-content: space-evenly;
	}
`;

const MenuImage = styled.img`
	width: 3vmin;
`;

const MenuLink = styled(Link)`
	font-size: 3vmin;
	font-weight: 600;
	text-decoration: none;
	color: #404040;
	display: flex;
	margin-right: 4vmin;
	@media screen and (max-width: 1200px) {
		margin-right: 0vmin;
		font-size: 4vmin;
	}
`;

const PlaceContainer = styled.div`
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	margin-top: 5vmin;
	width: 100%;
	@media screen and (max-width: 1200px) {
		margin-top: 3vmin;
		margin: 5vmin auto;
	}
`;

function IdolPage({ topic }) {
	let { path, url } = useRouteMatch();
	let { title } = useParams();
	const [sns, setSns] = useState([]);
	const [activeItem, setActiveItem] = useState("idolplace");
	const [mainImage, setMainImage] = useState("");
	const [photoChange, setPhotoChange] = useState(false);
	const [bannerImg, setBannerImg] = useState("");
	const [bannerChange, setBannerChange] = useState(false);
	const [followUsers, setFollowUsers] = useState([]);
	const [file, setFile] = useState(null);
	const [bannerFile, setBannerFile] = useState(null);
	const db = firebase.firestore();
	const docRef = db.collection("categories");
	const previewURL = file ? URL.createObjectURL(file) : mainImage;
	const bennerURL = bannerFile ? URL.createObjectURL(bannerFile) : bannerImg;

	useEffect(() => {
		docRef.where("title", "==", `${title}`).onSnapshot((querySnapshot) => {
			const item = [];
			querySnapshot.forEach((doc) => {
				// doc.data() is never undefined for query doc snapshots
				// console.log(doc.data());
				item.push({ star: doc.data() });
			});
			// console.log(item);
			setSns(item);
			setMainImage(item[0].star.main_image);
			setBannerImg(item[0].star.main_banner);
		});

		db.collection("categories")
			.doc(`${title}`)
			.get()
			.then((doc) => {
				setFollowUsers(doc.data().followedBy);
			});
	}, []);
	// console.log(title);
	const BannerOk = () => {
		setBannerChange(false);
		const fileRef = firebase.storage().ref(`banner_images/${title}`);
		const metadata = {
			contentType: bannerFile.type,
		};
		fileRef.put(bannerFile, metadata).then(() => {
			fileRef.getDownloadURL().then((imageUrl) => {
				docRef.doc(`${title}`).update({
					main_banner: `${imageUrl}`,
				});
			});
		});
		// alert("更新成功🎊🎊");
		Swal.fire("更新成功");
	};

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
		// alert("更新成功🎊🎊");
		Swal.fire("更新成功");
	};

	const AddSns = async (sns) => {
		if (sns === "facebook") {
			let { value: text } = await Swal.fire({
				title: `請輸入${sns}網址`,
				input: "text",
				inputPlaceholder: "",
			});

			if (text === undefined) {
				return;
			}
			let url = text;
			if (!url) {
				url = "";
			} else {
				docRef.doc(`${title}`).update({
					facebook: `${url}`,
				});
			}
		} else if (sns === "instagram") {
			let { value: text } = await Swal.fire({
				title: `請輸入${sns}網址`,
				input: "text",
				inputPlaceholder: "",
			});
			if (text === undefined) {
				return;
			}
			let url = text;
			if (!url) {
				url = "";
			} else {
				docRef.doc(`${title}`).update({
					instagram: `${url}`,
				});
			}
		} else if (sns === "twitter") {
			let { value: text } = await Swal.fire({
				title: `請輸入${sns}網址`,
				input: "text",
				inputPlaceholder: "",
			});

			if (text === undefined) {
				return;
			}
			let url = text;
			if (!url) {
				url = "";
			} else {
				docRef.doc(`${title}`).update({
					twitter: `${url}`,
				});
			}
		} else if (sns === "youtube") {
			let { value: text } = await Swal.fire({
				title: `請輸入${sns}網址`,
				input: "text",
				inputPlaceholder: "",
			});

			if (text === undefined) {
				return;
			}
			let url = text;
			if (!url) {
				url = "";
			} else {
				docRef.doc(`${title}`).update({
					youtube: `${url}`,
				});
			}
		}
	};

	const active = {
		borderBottom: "3px solid #404040",
	};

	return (
		<>
			<BannerArea>
				<Banner imgCover={bennerURL || initbanner}></Banner>
				{bannerChange ? (
					<BannerCheck as="label" htmlFor="uploadBanner" onClick={BannerOk} />
				) : (
					<BannerChange as="label" htmlFor="uploadBanner" />
				)}
				<input
					type="file"
					id="uploadBanner"
					style={{ display: "none" }}
					onChange={(e) => {
						setBannerFile(e.target.files[0]);
						setBannerChange(true);
					}}
				/>
			</BannerArea>
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
							<MenuLink
								to={`${url}`}
								onClick={() => {
									setActiveItem("idolplace");
								}}
								style={activeItem === "idolplace" ? active : []}
							>
								聖地
							</MenuLink>
							<MenuLink
								to={`${url}/picture`}
								onClick={() => {
									setActiveItem("idolphoto");
								}}
								style={activeItem === "idolphoto" ? active : []}
							>
								圖片區
							</MenuLink>
							<MenuLink
								to={`${url}/calender`}
								onClick={() => {
									setActiveItem("idolschedule");
								}}
								style={activeItem === "idolschedule" ? active : []}
							>
								日程表
							</MenuLink>
							<MenuLink
								to={`${url}/post`}
								onClick={() => {
									setActiveItem("idolpost");
								}}
								style={activeItem === "idolpost" ? active : []}
							>
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
