import React from "react";
import styled from "styled-components";
import RenderCalender from "./RenderCalender";

const Schedule = styled.div`
	display: flex;
	background-color: white;
	padding: 10px 20px;
	height: 80vh;
	border-radius: 10px;
	align-items: center;
`;

function Calender() {
	return (
		<Schedule>
			<RenderCalender />
		</Schedule>
	);
}

export default Calender;
