import styled from "styled-components";
import add from "../img/addimage.png";
import paper from "../img/rm429-013.png";

export const Container = styled.div`
	width: 80vmin;
	background-image: url(${paper});
	background-repeat: no-repeat;
	background-size: 100% 100%;
	position: fixed;
	top: 50%;
	left: 50%;
	margin-left: -40vmin;
	margin-top: -40vh;
	padding: 7vmin 5vmin 0vmin;
	display: flex;
	flex-direction: column;
	z-index: 5;
	@media screen and (max-width: 1200px) {
		width: 90vmin;
		margin-left: -45vmin;
	}
`;

export const InsideContainer = styled.div`
	width: 100%;
	height: 100%;
`;

export const InputTitle = styled.p`
	width: 55vmin;
	font-size: 2.5vmin;
	line-height: 4vmin;
	font-weight: 600;
	@media screen and (max-width: 1200px) {
		font-size: 3vmin;
		line-height: 3vmin;
	}
`;

export const LongTitle = styled(InputTitle)`
	@media screen and (max-width: 520px) {
		width: 100vmin;
		line-height: 4vmin;
	}
`;

export const InputArea = styled.input`
	border-radius: 10px;
	width: 100%;
	height: 4vmin;
	margin: 2vmin 0;
	padding-left: 10px;
	font-size: 2vmin;
	@media screen and (max-width: 1200px) {
		height: 5vmin;
	}
`;

export const ArtistName = styled.div`
	width: 100%;
	margin-top: 1vmin;
	display: flex;
	align-items: center;
	@media screen and (max-width: 1200px) {
		margin-top: 2vmin;
		flex-direction: column;
		align-items: flex-start;
	}
`;

export const ShortTitle = styled(InputTitle)`
	width: 20vmin;
`;

export const ArtistImage = styled(ArtistName)`
	@media screen and (max-width: 1200px) {
		flex-direction: row;
		align-items: center;
	}
`;

export const ImageTitle = styled(ShortTitle)`
	width: fit-content;
`;

export const Add = styled.button`
	background-image: url(${add});
	background-size: 100%;
	background-repeat: no-repeat;
	width: 5vmin;
	height: 5vmin;
	cursor: pointer;
`;

export const CoverImage = styled.img`
	width: 10vmin;
	margin-left: 3vmin;
`;

export const MultiImgs = styled.div`
	display: flex;
	max-height: 15vmin;
	flex-wrap: wrap;
	overflow-y: scroll;
`;

export const CoverImges = styled.div`
	width: 10vmin;
	height: 10vmin;
	margin: 2vmin;
`;

export const Image = styled.img`
	width: 100%;
	height: 100%;
`;

export const SendBtn = styled.div`
	width: 100%;
	margin: 5vmin auto;
	background-color: transparent;
	background-image: linear-gradient(to bottom, #9c8879, #482307);
	border: 0 solid #e5e7eb;
	border-radius: 0.5rem;
	box-sizing: border-box;
	color: #f8eedb;
	column-gap: 1rem;
	cursor: pointer;
	display: flex;
	justify-content: center;
	font-size: 2.5vmin;
	font-weight: 700;
	line-height: 2vmin;
	outline: 2px solid transparent;
	padding: 1.3vmin 2.3vmin;
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

	@media screen and (max-width: 550px) {
		padding: 2.5vmin 3.2vmin;
	}
`;
