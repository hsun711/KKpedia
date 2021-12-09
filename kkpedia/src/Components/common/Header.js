import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import firebase from "../../utils/firebase";
import Swal from "sweetalert2";
import userIcon from "../../img/user.png";
import SideMenu from "../common/SideMenu";
import Notification from "../common/Notification";
import { useHistory } from "react-router-dom";
import { snapshotUserData, snapshotUserNews } from "../../utils/firebaseFunc";
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
	const currentUser = useSelector((state) => state.currentUser);

	const showSidebar = () => {
		setSideBar(!sideBar);
	};

	useEffect(() => {
		if (currentUser && currentUser.uid) {
			const unsubscribe = snapshotUserData(currentUser.uid, setUserData);
			return () => {
				unsubscribe();
			};
		}
	}, [currentUser]);

	useEffect(() => {
		if (currentUser && currentUser.uid) {
			const unsubscribe = snapshotUserNews(
				currentUser.uid,
				setNewAlert,
				setNewsData
			);

			return () => unsubscribe();
		}
	}, [currentUser]);

	const showNewAlert = () => {
		setRenderNews(!renderNews);
	};

	const checkInput = (e) => {
		if (e.target.value === "") {
			Swal.fire("請輸入搜尋對象");
			return;
		} else {
			history.push(`/search/${inputSearch}`);
			setInputSearch("");
		}
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
										checkInput(e);
									}
								}}
							/>
							<InputBtn
								onClick={(e) => {
									checkInput(e);
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
										userData?.userImage !== null ? userData.userImage : userIcon
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
