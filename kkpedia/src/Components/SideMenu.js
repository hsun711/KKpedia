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
	z-index: 2;
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
				<LinkNav to="/idol">藝人</LinkNav>
				<LinkNav to="/drama">戲劇</LinkNav>
				<LinkNav to="/tvshow">綜藝</LinkNav>
			</Topic>
		</MenuBar>
	);
}

export default SideMenu;
