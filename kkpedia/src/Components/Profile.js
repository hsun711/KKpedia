import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
	BrowserRouter,
	Route,
	Link,
	Switch,
	useRouteMatch,
	HashRouter,
	useParams,
} from "react-router-dom";
import firebase from "../utils/firebase";
import PersonalData from "./PersonalData";
import PersonalCollection from "./PersonalCollection";
import PersonalPost from "./PersonalPost";
import userIcon from "../img/user.png";
import levelImg from "../img/level-up.png";
import profile from "../img/resume.png";
import like from "../img/place.png";
import post from "../img/comment.png";
import check from "../img/checked.png";
import changeimg from "../img/camera.png";
import edit from "../img/pencil.png";

const MainContainer = styled.div`
	width: 100%;
	display: flex;
	/* outline: 10px solid black; */
`;

const Container = styled.div`
	width: 70%;
	height: 100%;
	margin: 20vmin auto;
	padding: 0px 5vmin 7vmin;
	background-color: beige;
	display: flex;
	flex-direction: column;
	@media screen and (max-width: 992px) {
		margin: 90px auto;
	}
`;

const Person = styled.div`
	margin-top: 30px;
	margin-left: 30px;
	display: flex;
`;
const EditArea = styled.div`
	display: flex;
	align-items: center;
`;

const PersonName = styled.input`
	border: ${(props) => (props.edit ? "none" : "1px solid black")};
	border-radius: 10px;
	width: 30vmin;
	background-color: beige;
	padding-right: 1vmin;
	font-size: 4vmin;
	align-self: center;
`;

const EditIcon = styled.img`
	width: 2vmin;
	height: 2vmin;
	cursor: pointer;
	margin-right: 1vmin;
`;

const Photo = styled.div`
	display: flex;
	position: relative;
`;

const PersonImage = styled.img`
	margin-left: 2vmin;
	width: 10vmin;
	height: 10vmin;
	border-radius: 50%;
	cursor: pointer;
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
	bottom: -5px;
	right: -15px;
`;

const PhotoCheck = styled(PhotoChange)`
	background-image: url(${check});
`;

const LevelTag = styled.p`
	font-size: 3vmin;
	font-weight: 600;
	margin-left: 1.5vmin;
	text-align: center;
	align-self: center;
`;

const LevelImg = styled.img`
	width: 2vmin;
`;

const MenuBar = styled.div`
	margin-top: 7vmin;
	margin-left: 5vmin;
	display: flex;
`;

const MenuLink = styled(Link)`
	font-size: 2vmin;
	font-weight: 600;
	margin-right: 5vmin;
	text-decoration: none;
	color: black;
`;

const MenuImage = styled.img`
	width: 2vmin;
	margin-right: 5px;
`;

function Profile() {
	let { path, url } = useRouteMatch();
	const user = firebase.auth().currentUser;
	const db = firebase.firestore();
	const docRef = db.collection("users").doc(`${user.uid}`);
	const [readOnly, setReadOnly] = useState(true);
	const [userName, setUserName] = useState("");
	const [userImg, setUserImg] = useState("");
	const [level, setLevel] = useState(0);
	const [photoChange, setPhotoChange] = useState(false);
	const [file, setFile] = useState(null);
	const previewURL = file ? URL.createObjectURL(file) : userImg;

	useEffect(() => {
		docRef.onSnapshot((doc) => {
			setUserName(doc.data().userName);
			setUserImg(doc.data().userImage);
			setLevel(doc.data().userLevel);
		});
	}, []);

	const ChangeOk = () => {
		setPhotoChange(false);
		const fileRef = firebase.storage().ref(`users_images/${user.uid}`);
		const metadata = {
			contentType: file.type,
		};
		fileRef.put(file, metadata).then(() => {
			fileRef.getDownloadURL().then((imageUrl) => {
				docRef.update({
					userImage: `${imageUrl}`,
				});
			});
		});
		alert("更新成功🎊🎊");
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

	return (
		<MainContainer>
			<Container>
				<Person>
					<EditArea>
						<EditIcon src={readOnly ? edit : check} onClick={Editable} />
						<PersonName
							edit={readOnly}
							readOnly={readOnly}
							value={userName}
							onChange={(e) => {
								setUserName(e.target.value);
							}}
						/>
					</EditArea>
					<Photo>
						<PersonImage src={previewURL || userIcon} />
						{photoChange ? (
							<PhotoCheck as="label" htmlFor="uploadImage" onClick={ChangeOk} />
						) : (
							<PhotoChange as="label" htmlFor="uploadImage" />
						)}
						<input
							type="file"
							id="uploadImage"
							style={{ display: "none" }}
							onChange={(e) => {
								setFile(e.target.files[0]);
								ChangePhoto();
							}}
						/>
					</Photo>

					<LevelTag>
						<LevelImg src={levelImg} />
						{level}
					</LevelTag>
				</Person>
				<BrowserRouter>
					<>
						<MenuBar>
							<MenuLink to={`${url}`}>
								<MenuImage src={profile} />
								個人資料
							</MenuLink>
							<MenuLink to="/myCollection">
								<MenuImage src={like} />
								收藏景點
							</MenuLink>
							<MenuLink to="/myPost">
								<MenuImage src={post} />
								過往PO文
							</MenuLink>
						</MenuBar>
						<Switch>
							<Route exact path={`${url}`}>
								<PersonalData />
							</Route>
							<Route exact path="/myCollection">
								<PersonalCollection />
							</Route>
							<Route exact path="/myPost">
								<PersonalPost />
							</Route>
						</Switch>
					</>
				</BrowserRouter>
			</Container>
		</MainContainer>
	);
}

export default Profile;
