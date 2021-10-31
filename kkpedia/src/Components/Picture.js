import React, { useState } from "react";
import styled from "styled-components";
import NewPicture from "./NewPicture";
import idolimage from "../img/wanted.png";
import add from "../img/plus.png";

const Container = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

const Add = styled.div`
	background-image: url(${add});
	background-repeat: no-repeat;
	background-size: 100%;
	width: 7vmin;
	height: 7vmin;
	position: fixed;
	bottom: 3vmin;
	right: 3vmin;
	cursor: pointer;
`;

const EachPhoto = styled.div`
	display: flex;
	flex-direction: column;
	background-color: beige;
	padding: 10px;
	width: 100%;
	border-radius: 10px;
`;

const ImageHolder = styled.p`
	font-size: 3vmin;
`;

const PhotosArea = styled.div`
	width: 100%;
	margin-left: 0.5vmin;
`;
const Photos = styled.img`
	width: 10vmin;
	height: 10vmin;
	margin: 2vmin;
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

function Picture({ title }) {
	// let { category } = useParams();
	const [popAddPicture, setPopAddPicture] = useState(false);
	const AddPicture = () => {
		setPopAddPicture(!popAddPicture);
	};
	return (
		<>
			<Add onClick={AddPicture} topic="Idol" />
			{popAddPicture ? (
				<div>
					<Cover onClick={AddPicture} />
					<NewPicture title={title} />
				</div>
			) : (
				<Container>
					<EachPhoto>
						<ImageHolder>UserID</ImageHolder>
						<PhotosArea>
							<Photos src={idolimage} />
							<Photos src={idolimage} />
							<Photos src={idolimage} />
							<Photos src={idolimage} />
						</PhotosArea>
					</EachPhoto>
				</Container>
			)}
		</>
	);
}

export default Picture;
