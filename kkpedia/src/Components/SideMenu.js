import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const MenuBar = styled.div`
	width: 20vmin;
	height: 100vh;
	margin-top: 7vmin;
	background-color: #fff;
	border-right: 1px solid #dfe6e9;
	box-shadow: 1px 1px 3px #95a5a6;
	padding-top: 20vmin;
	position: fixed;
	/* @media screen and (max-width: 992px) {
		display: none;
	} */
`;

const Topic = styled.div`
	width: 20vmin;
	height: 30vmin;
	margin: 0px auto;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	font-size: 4vmin;
`;

const LinkNav = styled(Link)`
	color: #079992;
	font-weight: 600;
	text-decoration: none;
	&:hover {
		text-decoration: underline;
		transform: scale(1.1);
		transition: all 0.3s;
		cursor: pointer;
	}
`;

function SideMenu() {
	return (
		<MenuBar>
			<Topic>
				<LinkNav to="/idol">Idol</LinkNav>
				<LinkNav to="/drama">Drama</LinkNav>
				<LinkNav to="/tvshow">TV Show</LinkNav>
			</Topic>
		</MenuBar>
	);
}

export default SideMenu;
