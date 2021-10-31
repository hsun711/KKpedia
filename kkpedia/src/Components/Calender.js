import React from "react";
import styled from "styled-components";
import RenderCalender from "./RenderCalender";

const Schedule = styled.div`
	display: flex;
	width: 100%;
	height: 70%;
	background-color: white;
	padding: 10px 20px;
	border-radius: 10px;
	align-items: center;
`;

function Calender({ title }) {
	return (
		<Schedule>
			<RenderCalender title={title} />
		</Schedule>
	);
}

export default Calender;
