import React, { useEffect, useState } from "react";
import styled from "styled-components";
import idolimage from "../img/wanted.png";
import { useParams } from "react-router-dom";
import RenderCalender from "./RenderCalender";

const Schedule = styled.div`
	display: flex;
	background-color: white;
	padding: 10px 20px;
	height: 80vh;
	border-radius: 10px;
	align-items: center;
`;

function Place() {
	// let { category } = useParams();
	return (
		<Schedule>
			<RenderCalender />
		</Schedule>
	);
}

export default Place;
