import styled from "styled-components";

const CommentArea = styled.div`
	width: 90%;
	align-self: center;
	background-color: rgba(256, 256, 256, 0.5);
	box-shadow: 10px 10px 30px 5px rgba(0, 0, 0, 0.2);
	display: flex;
	flex-direction: column;
	padding: 3vmin;
	border-radius: 10px;
	margin: 3vmin 0vmin;
`;

const PosterDetail = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	margin-bottom: 1vmin;
	padding-left: 1vmin;
`;

const PosterImage = styled.img`
	width: 6vmin;
	height: 6vmin;
	border-radius: 50%;
`;

const PosterText = styled.div`
	width: 100%;
	margin-left: 1.5vmin;
`;

const PosterName = styled.p`
	font-size: 3vmin;
`;

const TimeStamp = styled.div`
	font-size: 1.5vmin;
`;

const Comment = styled.div`
	padding: 2vmin;
	word-wrap: break-word;
	@media screen and (max-width: 1200px) {
		font-size: 2.2vmin;
	}
`;

const CommentText = styled.p`
	font-size: 3.5vmin;
`;

const Icon = styled.div`
	display: flex;
	align-items: center;
	padding: 1vmin;
`;

const CommentIcon = styled.img`
	width: 4vmin;
	height: 4vmin;
	cursor: pointer;
	margin: 0.5vmin 0.5vmin 0 0;
	cursor: pointer;
`;

const ThumbsIcon = styled(CommentIcon)`
	margin: 0vmin 0.5vmin 0.5vmin 0;
`;

const GoodTotal = styled.p`
	font-size: 4vmin;
	margin-right: 4vmin;
`;

const EditArea = styled.div`
	display: flex;
	align-items: center;
`;

const TextArea = styled.textarea`
	width: 90%;
	height: 10vmin;
	font-size: 2.5vmin;
	border-radius: 10px;
	margin-top: 3vmin;
	padding: 1vmin;
	align-self: center;
	@media screen and (max-width: 1200px) {
		height: 7vmin;
	}
`;

const Submit = styled.div`
	align-self: flex-end;
	background-color: transparent;
	background-image: linear-gradient(to bottom, #fff, #f8eedb);
	border: 0 solid #e5e7eb;
	border-radius: 8px;
	box-sizing: border-box;
	color: #482307;
	column-gap: 1rem;
	cursor: pointer;
	display: flex;
	font-size: 2.5vmin;
	font-weight: 700;
	line-height: 2.5vmin;
	margin: 2vmin;
	outline: 2px solid transparent;
	padding: 1vmin 2vmin;
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
`;

export {
	CommentArea,
	PosterDetail,
	PosterImage,
	PosterText,
	PosterName,
	TimeStamp,
	Comment,
	CommentText,
	Icon,
	CommentIcon,
	ThumbsIcon,
	GoodTotal,
	EditArea,
	TextArea,
	Submit,
};
