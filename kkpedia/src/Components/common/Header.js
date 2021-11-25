import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import firebase from "../../utils/firebase";
import Swal from "sweetalert2";
import userIcon from "../../img/user.png";
import SideMenu from "../common/SideMenu";
import Notification from "../common/Notification";
import { useHistory } from "react-router-dom";
import { snapshotUserData } from "../../utils/firebaseFunc";

import {
	HeaderContainer,
	Notify,
	HeaderContent,
	HeaderNav,
	Logo,
	BurgerMenu,
	MemberImgDiv,
	Member,
	Search,
	SearchInput,
	InputBtn,
	LinkNav,
	Bell,
	AlertNum,
	Logout,
} from "../../style/header";

function Header() {
	const history = useHistory();
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
	// const currentUser = useSelector((state) => state.currentUser);

	useEffect(() => {
		snapshotUserData(user.uid, setUserData);
	}, []);

	useEffect(() => {
		const unsubscribe = db
			.collection("users")
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
		return () => unsubscribe();
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
								onKeyPress={(e) => {
									if (e.key === "Enter") {
										if (e.target.value === "") {
											Swal.fire("請輸入搜尋對象");
											return;
										} else {
											history.push(`/search/${inputSearch}`);
											e.target.value = "";
										}
									}
								}}
							/>
							<InputBtn
								onClick={(e) => {
									if (e.target.value === "") {
										Swal.fire("請輸入搜尋對象");
										return;
									} else {
										history.push(`/search/${inputSearch}`);
										e.target.value = "";
									}
								}}
							/>
						</Search>
						<Bell onClick={showNewAlert}>
							{newAlert !== 0 ? <AlertNum>{newAlert}</AlertNum> : null}
						</Bell>
						<LinkNav to="/profile">
							<MemberImgDiv>
								<Member
									src={
										userData?.userImage !== null
											? userData?.userImage
											: userIcon
									}
								/>
							</MemberImgDiv>
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
					) : null}
				</Notify>
			</HeaderContainer>
			{sideBar ? <SideMenu setSideBar={setSideBar} /> : null}
		</>
	);
}

export default Header;
