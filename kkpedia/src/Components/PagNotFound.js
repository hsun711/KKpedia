import React, { useState, useEffect } from "react";
import styled from "styled-components";
import board from "../img/cork-board.png";

const ShowContainer = styled.div`
	width: 80%;
	height: 100%;
	margin: 7vmin auto;
	position: relative;
	@media screen and (max-width: 1200px) {
		width: 90%;
	}
`;

const EachContainer = styled.div`
	width: 100%;
	border-radius: 10px;
	background-image: url(${board});
	box-shadow: 10px 10px 30px 5px rgba(0, 0, 0, 0.2);
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	margin-top: 3vmin;
`;

function PageNotFound() {
	return (
		<ShowContainer>
			<EachContainer>
				<lottie-player
					src="https://assets5.lottiefiles.com/packages/lf20_uF120X.json"
					background="transparent"
					speed="1"
					style={{ maxWidth: "50vmin", maxHeight: "50vmin" }}
					loop
					autoplay
				/>
			</EachContainer>
		</ShowContainer>
	);
}

export default PageNotFound;
