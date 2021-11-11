import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
	width: 70vmin;
	background-color: beige;
	position: fixed;
	top: 50%;
	left: 50%;
	margin-left: -35vmin;
	margin-top: -40vh;
	padding: 5vmin 7vmin;
	display: flex;
	flex-direction: column;
	z-index: 5;
`;

const AlertTxt = styled.p`
	width: 55vmin;
	font-size: 2.5vmin;
	font-weight: 600;
`;

function AlertPopUp({ text }) {
	return (
		<Container>
			<AlertTxt>{text}</AlertTxt>
		</Container>
	);
}

export default AlertPopUp;
