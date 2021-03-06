import styled from "styled-components";
import board from "../img/cork-board.png";

const TitleDiv = styled.div`
	display: flex;
	margin-left: 2vmin;
	align-items: center;
`;

const TopicTitle = styled.p`
	font-size: 7vmin;
	line-height: 7vmin;
	font-weight: 600;
	@media screen and (max-width: 1200px) {
		font-size: 10vmin;
		line-height: 10vmin;
	}
`;

const Add = styled.div`
	margin-top: 2.5vmin;
	margin-bottom: 8px;
	margin-left: 2vmin;
	padding: 0vmin 1vmin;
	background-color: #f8eedb;
	border: 2px solid #422800;
	border-radius: 30px;
	box-shadow: #422800 3px 3px 0 0;
	color: #422800;
	cursor: pointer;
	display: inline-block;
	font-weight: 600;
	font-size: 2.75vmin;
	text-align: center;
	text-decoration: none;
	user-select: none;
	-webkit-user-select: none;
	touch-action: manipulation;
	&:hover {
		background-color: #f3f4f6;
		box-shadow: #422800 1px 1px 0 0;
		transform: translate(2px, 2px);
	}
	@media screen and (max-width: 1200px) {
		box-shadow: #422800 2px 2px 0 0;
		padding: 0vmin 3vmin;
		margin-top: 3.5vmin;
	}
`;

const Cover = styled.div`
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	background-color: black;
	opacity: 0.8;
	z-index: 2;
`;

const Container = styled.div`
	width: 90%;
	height: 100%;
	margin: 7vmin auto;
	position: relative;
	@media screen and (max-width: 1200px) {
		width: 90%;
	}
`;
const EachContainer = styled.div`
	width: 100%;
	background-image: url(${board});
	box-shadow: 10px 10px 30px 5px rgba(0, 0, 0, 0.2);
	border-radius: 10px;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	margin-top: 3vmin;
	padding: 3vmin;
`;

export { TitleDiv, TopicTitle, Add, Cover, Container, EachContainer };
