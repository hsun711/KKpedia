import styled from "styled-components";
import check from "../img/checked.png";
import changeimg from "../img/photo-camera.png";
import { Link } from "react-router-dom";

const MainContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

const BannerArea = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

const Banner = styled.div`
	width: 100%;
	height: 40vmin;
	background-image: url(${(props) => props.imgCover});
	background-repeat: no-repeat;
	background-position: center 45%;
	background-size: 100% auto;
	border-radius: 0px 0px 10px 10px;
`;

const BannerChange = styled.div`
	align-self: flex-end;
	background-image: url(${changeimg});
	background-repeat: no-repeat;
	background-size: 55%;
	background-position: center center;
	background-color: #3a3b3c;
	border-radius: 50%;
	width: 4vmin;
	height: 4vmin;
	cursor: pointer;
	margin-top: -5vmin;
	margin-right: 1vmin;
`;

const BannerCheck = styled(BannerChange)`
	background-image: url(${check});
	background-color: rgba(0, 0, 0, 0);
`;

const Container = styled.div`
	width: 100%;
	height: 100%;
	margin: 0vmin auto;
	padding: 0 5vmin 7vmin;
	display: flex;
	flex-direction: column;
	@media screen and (max-width: 1200px) {
		margin: 0 auto;
	}
`;

const Person = styled.div`
	width: 100%;
	margin: 4vmin 0;
	display: flex;
	@media screen and (max-width: 1200px) {
		flex-direction: column;
		align-items: center;
		margin: -4vmin 0;
	}
`;
const EditArea = styled.div`
	display: flex;
	align-items: center;
	@media screen and (max-width: 1200px) {
		margin: 2vmin 0;
	}
`;

const UserNameDiv = styled.div`
	width: fit-content;
	font-size: 6vmin;
	font-weight: 600;
	margin-left: 2vmin;
	cursor: pointer;
`;

const PersonName = styled.input`
	border: ${(props) => (props.edit ? "none" : "1px solid black")};
	border-radius: 10px;
	width: fit-content;
	background-color: rgba(0, 0, 0, 0);
	padding-right: 1vmin;
	font-size: 4vmin;
	align-self: center;
`;

const EditIcon = styled.div`
	background-image: url(${check});
	background-size: 100%;
	background-repeat: no-repeat;
	width: 2vmin;
	height: 2vmin;
	cursor: pointer;
	margin: 0 1vmin;
	display: ${(props) => (props.edit ? "none" : "block")};
`;

const Photo = styled.div`
	display: flex;
	position: relative;
`;

const PersonImgDiv = styled.div`
	margin-left: 2vmin;
	width: 10vmin;
	height: 10vmin;
	border-radius: 50%;
	cursor: pointer;
	overflow: hidden;
	@media screen and (max-width: 1200px) {
		width: 15vmin;
		height: 15vmin;
	}
`;

const PersonImage = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;
const PhotoChange = styled.div`
	background-image: url(${changeimg});
	background-repeat: no-repeat;
	background-position-x: 0.67vmin;
	background-position-y: center;
	background-size: 60%;
	background-color: #3a3b3c;
	border-radius: 50%;
	width: 3vmin;
	height: 3vmin;
	cursor: pointer;
	margin-right: 1vmin;
	position: absolute;
	bottom: -0.5vmin;
	right: -1vmin;
	@media screen and (max-width: 1200px) {
		width: 4vmin;
		height: 4vmin;
		background-position-x: 0.75vmin;
		bottom: 0vmin;
	}
`;

const PhotoCheck = styled(PhotoChange)`
	background-image: url(${check});
`;

const LevelTag = styled.p`
	font-size: 4vmin;
	font-weight: 600;
	margin-left: 1.5vmin;
	text-align: center;
	align-self: center;
`;

const LevelImg = styled.img`
	width: 7vmin;
`;

const MenuBar = styled.div`
	margin: 5vmin 0 0 5vmin;
	display: flex;
	@media screen and (max-width: 1200px) {
		justify-content: space-evenly;
		margin: 7vmin 0 0 0;
	}
`;

const MenuLink = styled(Link)`
	font-size: 3vmin;
	font-weight: 600;
	margin-right: 5vmin;
	text-decoration: none;
	color: #2f3640;
	@media screen and (max-width: 1200px) {
		justify-content: space-evenly;
	}
`;

export {
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
};
