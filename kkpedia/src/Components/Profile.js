import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
	BrowserRouter,
	Route,
	Link,
	Switch,
	useRouteMatch,
	useLocation,
} from "react-router-dom";
import Compressor from "compressorjs";
import Swal from "sweetalert2";
import firebase from "../utils/firebase";
import PersonalData from "./PersonalData";
import PersonalCollection from "./PersonalCollection";
import PersonalPost from "./PersonalPost";
import userIcon from "../img/user.png";
import levelImg from "../img/level-up.png";
import check from "../img/checked.png";
import changeimg from "../img/photo-camera.png";
import initbanner from "../img/18034.jpg";

const MainContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	/* outline: 1px solid black; */
`;

const BannerArea = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

const Banner = styled.div`
	width: 100%;
	height: 40vmin;
	background-image: url(${(props) => props.imgCover});
	background-repeat: no-repeat;
	background-position: center 45%;
	background-size: 100% auto;
	border-radius: 0px 0px 10px 10px;
`;

const BannerChange = styled.div`
	align-self: flex-end;
	background-image: url(${changeimg});
	background-repeat: no-repeat;
	background-size: 55%;
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
	width: 100%;
	height: 100%;
	margin: 0vmin auto;
	padding: 0 5vmin 7vmin;
	display: flex;
	flex-direction: column;
	@media screen and (max-width: 1200px) {
		margin: 0 auto;
	}
`;

const Person = styled.div`
	width: 100%;
	margin: 4vmin 0;
	display: flex;
	@media screen and (max-width: 1200px) {
		flex-direction: column;
		align-items: center;
		margin: -4vmin 0;
	}
`;
const EditArea = styled.div`
	display: flex;
	align-items: center;
	@media screen and (max-width: 1200px) {
		margin: 2vmin 0;
	}
`;

const UserNameDiv = styled.div`
	width: fit-content;
	font-size: 6vmin;
	font-weight: 600;
	margin-left: 2vmin;
	cursor: pointer;
`;

const PersonName = styled.input`
	border: ${(props) => (props.edit ? "none" : "1px solid black")};
	border-radius: 10px;
	width: fit-content;
	background-color: rgba(0, 0, 0, 0);
	padding-right: 1vmin;
	font-size: 4vmin;
	align-self: center;
`;

const EditIcon = styled.div`
	background-image: url(${check});
	background-size: 100%;
	background-repeat: no-repeat;
	width: 2vmin;
	height: 2vmin;
	cursor: pointer;
	margin: 0 1vmin;
	display: ${(props) => (props.edit ? "none" : "block")};
`;

const Photo = styled.div`
	display: flex;
	position: relative;
`;

const PersonImgDiv = styled.div`
	margin-left: 2vmin;
	width: 10vmin;
	height: 10vmin;
	border-radius: 50%;
	cursor: pointer;
	overflow: hidden;
	@media screen and (max-width: 1200px) {
		width: 15vmin;
		height: 15vmin;
	}
`;

const PersonImage = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;
const PhotoChange = styled.div`
	background-image: url(${changeimg});
	background-repeat: no-repeat;
	background-position-x: 0.67vmin;
	background-position-y: center;
	background-size: 60%;
	background-color: #3a3b3c;
	border-radius: 50%;
	width: 3vmin;
	height: 3vmin;
	cursor: pointer;
	margin-right: 1vmin;
	position: absolute;
	bottom: -0.5vmin;
	right: -1vmin;
	@media screen and (max-width: 1200px) {
		width: 4vmin;
		height: 4vmin;
		background-position-x: 0.75vmin;
		bottom: 0vmin;
	}
`;

const PhotoCheck = styled(PhotoChange)`
	background-image: url(${check});
`;

const LevelTag = styled.p`
	font-size: 4vmin;
	font-weight: 600;
	margin-left: 1.5vmin;
	text-align: center;
	align-self: center;
`;

const LevelImg = styled.img`
	width: 7vmin;
`;

const MenuBar = styled.div`
	margin: 5vmin 0 0 5vmin;
	display: flex;
	@media screen and (max-width: 1200px) {
		justify-content: space-evenly;
		margin: 7vmin 0 0 0;
	}
`;

const MenuLink = styled(Link)`
	font-size: 3vmin;
	font-weight: 600;
	margin-right: 5vmin;
	text-decoration: none;
	color: #2f3640;
	@media screen and (max-width: 1200px) {
		justify-content: space-evenly;
	}
`;

function Profile() {
	let { path, url } = useRouteMatch();
	const user = firebase.auth().currentUser;
	const db = firebase.firestore();
	const docRef = db.collection("users").doc(`${user.uid}`);
	const [activeItem, setActiveItem] = useState(url);
	const [readOnly, setReadOnly] = useState(true);
	const [userName, setUserName] = useState("");
	const [userImg, setUserImg] = useState("");
	const [level, setLevel] = useState(0);
	const [photoChange, setPhotoChange] = useState(false);
	const [file, setFile] = useState(null);
	const [bannerImg, setBannerImg] = useState("");
	const [bannerChange, setBannerChange] = useState(false);
	const [bannerFile, setBannerFile] = useState(null);
	const previewURL = file ? URL.createObjectURL(file) : userImg;
	const bennerURL = bannerFile ? URL.createObjectURL(bannerFile) : bannerImg;

	useEffect(() => {
		const unsubscribe = docRef.onSnapshot((doc) => {
			setBannerImg(doc.data().user_banner);
			setUserName(doc.data().userName);
			setUserImg(doc.data().userImage);
			setLevel(doc.data().userLevel);
		});
		return () => unsubscribe();
	}, []);

	const BannerOk = () => {
		setBannerChange(false);
		const fileRef = firebase.storage().ref(`users_images/banner${user.uid}`);
		const metadata = {
			contentType: bannerFile.type,
		};
		new Compressor(bannerFile, {
			quality: 0.8,
			success: (compressedResult) => {
				fileRef.put(compressedResult, metadata).then(() => {
					fileRef.getDownloadURL().then((imageUrl) => {
						docRef.update({
							user_banner: `${imageUrl}`,
						});
					});
				});
				Swal.fire("更新成功");
			},
		});
	};

	const ChangeOk = () => {
		setPhotoChange(false);
		const fileRef = firebase.storage().ref(`users_images/${user.uid}`);
		const metadata = {
			contentType: file.type,
		};
		new Compressor(file, {
			quality: 0.8,
			success: (compressedResult) => {
				fileRef.put(compressedResult, metadata).then(() => {
					fileRef.getDownloadURL().then((imageUrl) => {
						docRef.update({
							userImage: `${imageUrl}`,
						});
					});
				});
				Swal.fire("更新成功");
			},
		});
	};

	const ChangePhoto = () => {
		setPhotoChange(true);
	};

	const Editable = () => {
		if (readOnly === false) {
			setReadOnly(true);
			// console.log(editText);
			docRef.update({
				userName: `${userName}`,
			});
		} else {
			setReadOnly(false);
		}
	};

	const active = {
		borderBottom: "3px solid #404040",
	};

	return (
		<MainContainer>
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
					accept="image/*"
					onChange={(e) => {
						if (e.target.files[0] === null) {
							return;
						} else {
							const fileType = e.target.files[0].type.slice(0, 5);
							if (fileType !== "image") {
								Swal.fire("請上傳圖片檔");
								return;
							} else {
								setBannerFile(e.target.files[0]);
								setBannerChange(true);
							}
						}
					}}
				/>
			</BannerArea>
			<Container>
				<Person>
					<Photo>
						<PersonImgDiv>
							<PersonImage src={previewURL || userIcon} />
						</PersonImgDiv>
						{photoChange ? (
							<PhotoCheck as="label" htmlFor="uploadImage" onClick={ChangeOk} />
						) : (
							<PhotoChange as="label" htmlFor="uploadImage" />
						)}
						<input
							type="file"
							id="uploadImage"
							style={{ display: "none" }}
							accept="image/*"
							onChange={(e) => {
								if (e.target.files[0] === null) {
									return;
								} else {
									const fileType = e.target.files[0].type.slice(0, 5);
									if (fileType !== "image") {
										Swal.fire("請上傳圖片檔");
										return;
									} else {
										setFile(e.target.files[0]);
										ChangePhoto();
									}
								}
							}}
						/>
					</Photo>
					<EditArea>
						<EditIcon edit={readOnly} onClick={Editable} />
						{readOnly ? (
							<UserNameDiv onClick={Editable}>{userName}</UserNameDiv>
						) : (
							<PersonName
								edit={readOnly}
								readOnly={readOnly}
								value={userName}
								onChange={(e) => {
									setUserName(e.target.value);
								}}
							/>
						)}
						<LevelTag>
							<LevelImg src={levelImg} />
							LV.{level}
						</LevelTag>
					</EditArea>
				</Person>
				<BrowserRouter>
					<>
						<MenuBar>
							<MenuLink
								to={`${url}`}
								onClick={() => {
									setActiveItem("/profile");
								}}
								style={activeItem === "/profile" ? active : []}
							>
								個人資料
							</MenuLink>
							<MenuLink
								to="/profile/myCollection"
								onClick={() => {
									setActiveItem("/profile/myCollection");
								}}
								style={activeItem === "/profile/myCollection" ? active : []}
							>
								口袋聖地
							</MenuLink>
							<MenuLink
								to="/profile/myPost"
								onClick={() => {
									setActiveItem("/profile/myPost");
								}}
								style={activeItem === "/profile/myPost" ? active : []}
							>
								過往PO文
							</MenuLink>
						</MenuBar>
						<Switch>
							<Route exact path={`${url}`}>
								<PersonalData setActiveItem={setActiveItem} />
							</Route>
							<Route exact path="/profile/myCollection">
								<PersonalCollection setActiveItem={setActiveItem} />
							</Route>
							<Route exact path="/profile/myPost">
								<PersonalPost setActiveItem={setActiveItem} />
							</Route>
						</Switch>
					</>
				</BrowserRouter>
			</Container>
		</MainContainer>
	);
}

export default Profile;
