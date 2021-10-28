import React from "react";
import styled from "styled-components";
import idolimage from "../img/wanted.png";

const Container = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
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

function Place() {
	// let { category } = useParams();
	return (
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
	);
}

export default Place;
