import React, { useState } from "react";
import styled from "styled-components";
import menu from "../img/burgerMenu.png";
import user from "../img/user.png";
import logo from "../img/logo1.png";
import search from "../img/search.png";
import SideMenu from "./SideMenu";
import { Link } from "react-router-dom";

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

const Member = styled.div`
	background-image: url(${user});
	background-size: 100%;
	background-repeat: no-repeat;
	width: 3vmin;
	height: 3vmin;
	margin: auto 2.5vmin;
	cursor: pointer;
`;

const SearchInput = styled.input`
	border-radius: 20px;
	width: 20vmin;
	height: 4vmin;
	background-image: url(${search});
	background-repeat: no-repeat;
	background-position: right center;
	background-size: 4vmin;
	padding: 8px 48px 8px 20px;
	outline: none;

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

const LinkNav = styled(Link)`
	&:hover {
		cursor: pointer;
	}
`;

function Header() {
	const [sideBar, setSideBar] = useState(true);
	const showSidebar = () => {
		setSideBar(!sideBar);
	};
	return (
		<div>
			<HeaderContent>
				<HeaderNav>
					<BurgerMenu onClick={showSidebar} />
					<LinkNav to="/idol">
						<Logo />
					</LinkNav>
				</HeaderNav>
				<HeaderNav>
					<SearchInput />
					<LinkNav to="/profile">
						<Member />
					</LinkNav>
				</HeaderNav>
			</HeaderContent>
			{sideBar ? <SideMenu /> : <div></div>}
		</div>
	);
}

export default Header;
