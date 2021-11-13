import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const MenuBar = styled.div`
	width: 20vmin;
	height: 100vh;
	background-color: rgb(256, 256, 256);
	box-shadow: 0 0 5px 5px rgba(256, 256, 256, 0.9);
	padding-top: 20vmin;
	position: fixed;
	z-index: 1;
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
	color: #482307;
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
				<LinkNav to="/idol">藝人</LinkNav>
				<LinkNav to="/drama">戲劇</LinkNav>
				<LinkNav to="/tvshow">綜藝</LinkNav>
			</Topic>
		</MenuBar>
	);
}

export default SideMenu;
