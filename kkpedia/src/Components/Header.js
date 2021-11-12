import React, { useEffect, useState } from "react";
import styled from "styled-components";
import firebase from "../utils/firebase";
import menu from "../img/burgerMenu.png";
import userIcon from "../img/user.png";
import logo from "../img/logo02.png";
import search from "../img/search.png";
import SideMenu from "./SideMenu";
import Notification from "./Notification";
import { Link } from "react-router-dom";
import logout from "../img/logout.png";
import bell from "../img/bell.png";

const HeaderContainer = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
`;

const Notify = styled.div`
	box-shadow: 1px 1px 3px #95a5a6;
	width: 50%;
	align-self: flex-end;
	position: absolute;
	right: 0px;
	top: 3.5vmin;
	@media screen and (max-width: 1200px) {
		width: 60%;
	}
	@media screen and (max-width: 992px) {
		top: 5vmin;
		width: 80%;
	}
`;

const HeaderContent = styled.div`
	background-color: rgba(256, 256, 256);
	display: flex;
	border: 1px solid #dfe6e9;
	width: 100%;
	height: 7vmin;
	margin: 0px auto;
	position: sticky;
	top: 0px;
	z-index: 2;
	justify-content: space-between;
	/* outline: 2px solid black; */
	@media screen and (max-width: 992px) {
		height: 10vmin;
	}
`;

const HeaderNav = styled.div`
	display: flex;
	align-items: center;
`;

const Logo = styled.div`
	background-image: url(${logo});
	background-size: 90%;
	background-repeat: no-repeat;
	margin: 2vmin 0vmin 0vmin 1vmin;
	width: 15vmin;
	height: 7vmin;
	@media screen and (max-width: 1200px) {
		width: 19vmin;
		margin: 0vmin 0vmin 0vmin 1vmin;
	}
`;

const BurgerMenu = styled.div`
	background-image: url(${menu});
	background-size: 100%;
	background-repeat: no-repeat;
	width: 3vmin;
	height: 3vmin;
	margin: auto 2.5vmin;
	cursor: pointer;
	@media screen and (max-width: 1200px) {
		width: 4vmin;
		height: 4vmin;
	}
`;

const Member = styled.img`
	width: 3vmin;
	height: 3vmin;
	margin-top: 0.5vmin;
	margin-right: 2.5vmin;
	margin-left: 2.5vmin;
	border-radius: 50%;
	cursor: pointer;
	@media screen and (max-width: 1200px) {
		width: 4vmin;
		height: 4vmin;
	}
`;

const Search = styled.div`
	display: flex;
	position: relative;
`;

const SearchInput = styled.input`
	border-radius: 20px;
	border: 2px solid #8a4b35;
	width: 25vmin;
	height: 4vmin;
	padding: 8px 48px 8px 20px;
	outline: none;
	font-size: 2vmin;
	@media screen and (max-width: 1200px) {
		width: 20vmin;
		height: 3vmin;
		padding: 2vmin;
	}
`;

const InputBtn = styled(Link)`
	background-image: url(${search});
	background-repeat: no-repeat;
	background-size: 100%;
	width: 4vmin;
	height: 4vmin;
	position: absolute;
	right: 1vmin;
	cursor: pointer;
	@media screen and (max-width: 1200px) {
		top: 0.25vmin;
	}
`;

const LinkNav = styled(Link)`
	&:hover {
		cursor: pointer;
	}
`;

const Bell = styled.div`
	background-image: url(${bell});
	background-repeat: no-repeat;
	background-size: 100%;
	width: 3vmin;
	height: 3vmin;
	margin-left: 2vmin;
	cursor: pointer;
	position: relative;
	@media screen and (max-width: 1200px) {
		width: 4vmin;
		height: 4vmin;
	}
`;

const AlertNum = styled.div`
	font-size: 1.75vmin;
	background-color: red;
	color: #fff;
	width: 2vmin;
	height: 2vmin;
	border-radius: 50%;
	outline: 1px solid white;
	text-align: center;
	position: absolute;
	bottom: -0.5vmin;
	right: -1vmin;
	@media screen and (max-width: 1200px) {
		font-size: 2vmin;
		width: 2.5vmin;
		height: 2.5vmin;
	}
`;

const Logout = styled.div`
	background-image: url(${logout});
	background-repeat: no-repeat;
	background-size: 100%;
	width: 3vmin;
	height: 3vmin;
	margin-right: 2vmin;
	cursor: pointer;
	@media screen and (max-width: 1200px) {
		width: 4vmin;
		height: 4vmin;
	}
`;

function Header() {
	const [sideBar, setSideBar] = useState(false);
	const [inputSearch, setInputSearch] = useState("");
	const [userData, setUserData] = useState({});
	const [newAlert, setNewAlert] = useState(0);
	const [newsData, setNewsData] = useState([]);
	const [renderNews, setRenderNews] = useState(false);
	const db = firebase.firestore();
	const user = firebase.auth().currentUser;
	const showSidebar = () => {
		setSideBar(!sideBar);
	};

	useEffect(() => {
		db.collection("users")
			.doc(`${user.uid}`)
			.onSnapshot((doc) => {
				setUserData(doc.data());
			});
		db.collection("users")
			.doc(`${user.uid}`)
			.collection("news")
			.onSnapshot((querySnapshot) => {
				setNewAlert(querySnapshot.docs.length);
				const item = [];
				querySnapshot.forEach((doc) => {
					item.push(doc.data());
				});
				setNewsData(item);
			});
	}, []);

	const showNewAlert = () => {
		setRenderNews(!renderNews);
	};

	return (
		<>
			<HeaderContainer>
				<HeaderContent>
					<HeaderNav>
						<BurgerMenu onClick={showSidebar} />
						<LinkNav to="/">
							<Logo />
						</LinkNav>
					</HeaderNav>
					<HeaderNav>
						<Search>
							<SearchInput
								value={inputSearch}
								onChange={(e) => {
									setInputSearch(e.target.value);
								}}
							/>
							<InputBtn to={`/search/${inputSearch}`} />
						</Search>
						<Bell onClick={showNewAlert}>
							{newAlert !== 0 ? <AlertNum>{newAlert}</AlertNum> : <></>}
						</Bell>
						<LinkNav to="/profile">
							<Member
								src={
									userData.userImage !== null ? userData.userImage : userIcon
								}
							/>
						</LinkNav>
						<Logout
							onClick={() => {
								firebase.auth().signOut();
							}}
						/>
					</HeaderNav>
				</HeaderContent>
				<Notify>
					{renderNews ? (
						<Notify>
							{newsData.map((data) => {
								return <Notification data={data} key={data.docid} />;
							})}
						</Notify>
					) : (
						<></>
					)}
				</Notify>
			</HeaderContainer>
			{sideBar ? <SideMenu /> : <div></div>}
		</>
	);
}

export default Header;
