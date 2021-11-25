import styled from "styled-components";
import Popup from "reactjs-popup";
import background from "../img/20800062.png";
import star from "../img/star.png";

export const MainContainer = styled.div`
	width: 100%;
	background-image: url(${background});
	background-size: 100% 100%;
	background-repeat: no-repeat;
	box-shadow: 10px 10px 30px 5px rgba(0, 0, 0, 0.2);
	@media screen and (max-width: 1200px) {
		width: 90%;
	}
`;

export const Container = styled.div`
	width: 90%;
	display: flex;
	flex-direction: column;
	padding: 4vmin;
	margin: 0vmin auto;
`;

export const TopDetail = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	@media screen and (max-width: 1200px) {
		flex-direction: column;
	}
`;

export const Photo = styled.div`
	width: 50vmin;
	height: 30vmin;
	display: flex;
	justify-content: center;
	position: relative;
	@media screen and (max-width: 1200px) {
		margin: 0 auto;
	}
`;

export const MainImage = styled.img`
	max-width: 100%;
	max-height: 100%;
`;

export const LocationDetail = styled.div`
	width: 100%;
	max-height: 30vmin;
	display: flex;
	flex-direction: column;
	padding-left: 3vmin;
	justify-content: space-between;
	@media screen and (max-width: 1200px) {
		padding-top: 5vmin;
		max-height: 50vmin;
		padding-left: 0vmin;
	}
`;

export const TitleName = styled.p`
	font-size: 5vmin;
	font-weight: 600;
	line-height: 7vmin;
	color: #404040;
	@media screen and (max-width: 1200px) {
		font-size: 6vmin;
		line-height: 10vmin;
	}
`;

export const EditIcon = styled.img`
	width: 2vmin;
	height: 2vmin;
	cursor: pointer;
	margin-right: 1vmin;
	margin-top: 0.5vmin;
`;

export const EditArea = styled.div`
	display: flex;
	padding-top: 1vmin;
`;

export const Description = styled.textarea`
	border: ${(props) => (props.edit ? "none" : "1px solid black")};
	font-size: 2vmin;
	width: 100%;
	height: 10vmin;
	border-radius: 10px;
	color: grey;
	resize: none;
`;

export const DescDiv = styled.div`
	width: 100%;
	height: 10vmin;
	color: #57606f;
	font-size: 2vmin;
	@media screen and (max-width: 1200px) {
		font-size: 2.5vmin;
	}
`;

export const NormalTxt = styled.p`
	font-size: 2.3vmin;
	line-height: 4vmin;
	color: #57606f;
	@media screen and (max-width: 1200px) {
		line-height: 5vmin;
	}
	@media screen and (max-width: 450px) {
		line-height: 6vmin;
	}
`;

export const LikeIcon = styled.img`
	width: 4vmin;
	height: 4vmin;
	cursor: pointer;
	@media screen and (max-width: 500px) {
		margin-top: 1.5vmin;
		width: 5vmin;
		height: 5vmin;
	}
`;

export const SubTitle = styled.p`
	font-size: 3vmin;
	font-weight: 600;
	margin-top: 4vmin;
	margin-bottom: 1vmin;
	color: #404040;
`;

export const PlaceMap = styled.div`
	width: 100%;
	height: 20vmin;
	margin: 1vmin 0px;
`;

export const MoreImage = styled.div`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-evenly;
	align-items: center;
	margin-top: 7vmin;
`;

export const SingleImg = styled.div`
	display: flex;
	justify-content: center;
	width: 15vmin;
	height: 20vmin;
	cursor: pointer;
	overflow: hidden;
`;

export const Image = styled.img`
	max-width: 100%;
	height: 100%;
	object-fit: cover;
	@media screen and (max-width: 1024px) {
		margin: 2vmin;
	}
`;

export const CommentArea = styled.div`
	width: 90%;
	display: flex;
	flex-direction: column;
	margin: 3vmin auto;
`;

export const Comment = styled.div`
	padding: 2vmin;
	background-color: rgba(256, 256, 256, 0.7);
	box-shadow: 10px 10px 30px 5px rgba(0, 0, 0, 0.2);
	border-radius: 10px;
	display: flex;
	margin-bottom: 2vmin;
`;

export const CommentUser = styled.img`
	width: 4.5vmin;
	height: 4.5vmin;
	border-radius: 50%;
	outline: 1px solid black;
`;

export const CommentTxtArea = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

export const CommentTxt = styled.div`
	padding: 0px 2vmin;
`;

export const Score = styled.div`
	background-image: url(${star});
	background-repeat: no-repeat;
	background-size: 100%;
	width: 2.5vmin;
	height: 2.5vmin;
	margin-bottom: 1vmin;
`;

export const ScoreTxt = styled.p`
	font-size: 2.5vmin;
	font-weight: 600;
	margin-left: 3vmin;
`;

export const TimeStamp = styled.div`
	font-size: 1.5vmin;
	align-self: flex-end;
`;

export const BottomBtn = styled.div`
	display: flex;
	justify-content: space-around;
	margin-top: 3vmin;
`;

export const CheckBtn = styled.div`
	background-color: transparent;
	background-image: linear-gradient(to bottom, #fff, #f8eedb);
	border: 0 solid #e5e7eb;
	border-radius: 0.5rem;
	box-sizing: border-box;
	color: #482307;
	column-gap: 1rem;
	cursor: pointer;
	display: flex;
	font-size: 2vmin;
	font-weight: 700;
	line-height: 2vmin;
	margin: 0;
	outline: 2px solid transparent;
	padding: 1.3vmin 2.3vmin;
	text-align: center;
	text-transform: none;
	transition: all 0.1s cubic-bezier(0.4, 0, 0.2, 1);
	user-select: none;
	-webkit-user-select: none;
	touch-action: manipulation;
	box-shadow: 6px 8px 10px rgba(81, 41, 10, 0.1),
		0px 2px 2px rgba(81, 41, 10, 0.2);
	&:hover {
		background-color: #f3f4f6;
		box-shadow: 1px 2px 5px rgba(81, 41, 10, 0.15),
			0px 1px 1px rgba(81, 41, 10, 0.15);
		transform: translateY(0.125rem);
	}
	@media screen and (max-width: 1200px) {
		font-size: 1.5vmin;
	}
	@media screen and (max-width: 550px) {
		padding: 2.5vmin 3.2vmin;
	}
`;

export const Cover = styled.div`
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	background-color: black;
	opacity: 0.5;
	z-index: 2;
`;

export const StyledPopup = styled(Popup)`
	&-overlay {
		background: rgba(0, 0, 0, 0.5);
	}
`;
