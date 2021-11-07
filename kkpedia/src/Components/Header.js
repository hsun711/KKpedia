import React, { useEffect, useState } from "react";
import styled from "styled-components";
import firebase from "../utils/firebase";
import algolia from "../utils/algolia";
import menu from "../img/burgerMenu.png";
import userIcon from "../img/user.png";
import logo from "../img/logo1.png";
import search from "../img/search.png";
import SideMenu from "./SideMenu";
import Notification from "./Notification";
import { Link, useHistory } from "react-router-dom";
import logout from "../img/logout.png";
import bell from "../img/bell.png";

const HeaderContent = styled.div`
	background-color: #fff;
	display: flex;
	border: 1px solid #dfe6e9;
	width: 100%;
	height: 7vmin;
	margin: 0px auto;
	box-shadow: 1px 1px 3px #95a5a6;
	display: flex;
	position: fixed;
	z-index: 2;
	justify-content: space-between;
`;

const HeaderNav = styled.div`
	display: flex;
	align-items: center;
`;

const Logo = styled.div`
	background-image: url(${logo});
	background-size: 100%;
	background-repeat: no-repeat;
	margin-left: 2.5vmin;
	width: 15vmin;
	height: 7vmin;
`;

const BurgerMenu = styled.div`
	background-image: url(${menu});
	background-size: 100%;
	background-repeat: no-repeat;
	width: 3vmin;
	height: 3vmin;
	margin: auto 2.5vmin;
	cursor: pointer;
	/* @media screen and (max-width: 992px) {
		display: block;
	} */
`;

const Member = styled.img`
	width: 3vmin;
	height: 3vmin;
	margin: auto 2.5vmin;
	border-radius: 50%;
	cursor: pointer;
`;

const Search = styled.div`
	display: flex;
	position: relative;
`;

const SearchInput = styled.input`
	border-radius: 20px;
	width: 20vmin;
	height: 4vmin;
	padding: 8px 48px 8px 20px;
	outline: none;
	font-size: 2vmin;
	/* @media screen and (max-width: 1280px){
        width: 0;
        padding: 20px;
        border: none;
        font-size: 16px;
        background-size: 32px;
        position: absolute;
        right: 10px;
        cursor: pointer;

        &:focus {
            width: 90%;
            border: solid 1px #979797;
        }
    } */
`;

const InputBtn = styled(Link)`
	background-image: url(${search});
	background-repeat: no-repeat;
	background-size: 100%;
	width: 4vmin;
	height: 4vmin;
	position: absolute;
	right: 0px;
	cursor: pointer;
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
`;

const AlertNum = styled.div`
	font-size: 1.75vmin;
	font-weight: 600;
	background-color: red;
	width: 2vmin;
	height: 2vmin;
	border-radius: 50%;
	border: 1px solid black;
	text-align: center;
	position: absolute;
	bottom: -5px;
	right: -10px;
`;

const Logout = styled.div`
	background-image: url(${logout});
	background-repeat: no-repeat;
	background-size: 100%;
	width: 3vmin;
	height: 3vmin;
	margin-right: 2vmin;
	cursor: pointer;
`;

const Notify = styled.div`
	border: 1px solid #dfe6e9;
	box-shadow: 1px 1px 3px #95a5a6;
	width: 30vmin;
	position: absolute;
	right: 0px;
	top: 7vmin;
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

	const SearchChange = (e) => {
		setInputSearch(e.target.value);
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
		// setNewAlert(0);
		// console.log(newsData);
	};

	return (
		<>
			<HeaderContent>
				<HeaderNav>
					<BurgerMenu onClick={showSidebar} />
					<LinkNav to="/">
						<Logo />
					</LinkNav>
				</HeaderNav>
				<HeaderNav>
					<Search>
						<SearchInput value={inputSearch} onChange={SearchChange} />
						<InputBtn to={`/search/${inputSearch}`} />
					</Search>
					<Bell onClick={showNewAlert}>
						{newAlert !== 0 ? <AlertNum>{newAlert}</AlertNum> : <></>}
					</Bell>
					<LinkNav to="/profile">
						<Member
							src={userData.userImage !== null ? userData.userImage : userIcon}
						/>
					</LinkNav>
					<Logout
						onClick={() => {
							firebase.auth().signOut();
						}}
					/>
				</HeaderNav>
				{renderNews ? (
					<Notify>
						{newsData.map((data) => {
							return <Notification data={data} key={data.docid} />;
						})}
					</Notify>
				) : (
					<></>
				)}
			</HeaderContent>
			{sideBar ? <SideMenu /> : <div></div>}
		</>
	);
}

export default Header;
