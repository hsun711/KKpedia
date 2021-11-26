import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import PersonalData from "./PersonalData";
import PersonalCollection from "./PersonalCollection";
import PersonalPost from "./PersonalPost";
import userIcon from "../../img/user.png";
import levelImg from "../../img/level-up.png";
import initbanner from "../../img/18034.jpg";
import {
	getUserData,
	updateSingleImage,
	editUserName,
} from "../../utils/firebaseFunc";
import {
	MainContainer,
	BannerArea,
	Banner,
	BannerChange,
	BannerCheck,
	Container,
	Person,
	EditArea,
	UserNameDiv,
	PersonName,
	EditIcon,
	Photo,
	PersonImgDiv,
	PersonImage,
	PhotoChange,
	PhotoCheck,
	LevelTag,
	LevelImg,
	MenuBar,
	MenuLink,
} from "../../style/profile";

import { uploadImage } from "../../utils/commonFunc";

function Profile() {
	let { path, url } = useRouteMatch();
	const currentUser = useSelector((state) => state.currentUser);
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
		if (currentUser && currentUser.uid) {
			getUserData(currentUser.uid).then((doc) => {
				setBannerImg(doc.data().user_banner);
				setUserName(doc.data().userName);
				setUserImg(doc.data().userImage);
				setLevel(doc.data().userLevel);
			});
		}
	}, [currentUser]);

	const BannerOk = () => {
		setBannerChange(false);
		const metadata = {
			contentType: bannerFile.type,
		};
		updateSingleImage(
			`users_images/banner${currentUser.uid}`,
			bannerFile,
			metadata,
			"users",
			currentUser.uid,
			"user_banner"
		);
	};

	const ChangeOk = () => {
		setPhotoChange(false);
		const metadata = {
			contentType: file.type,
		};
		updateSingleImage(
			`users_images/${currentUser.uid}`,
			file,
			metadata,
			"users",
			currentUser.uid,
			"userImage"
		);
	};

	const Editable = () => {
		if (readOnly === false) {
			setReadOnly(true);
			editUserName(currentUser.uid, userName);
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
						uploadImage(e, setBannerFile, setBannerChange);
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
								uploadImage(e, setFile, setPhotoChange);
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
