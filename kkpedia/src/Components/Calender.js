import React from "react";
import styled from "styled-components";
import RenderCalender from "./RenderCalender";

const Schedule = styled.div`
	width: 100%;
	height: 50%;
	background-color: rgba(256, 256, 256, 0.8);
	padding: 5vmin 3vmin;
	border-radius: 10px;
	align-items: center;
	box-shadow: 10px 10px 30px 5px rgba(0, 0, 0, 0.2);
	@media screen and (max-width: 1200px) {
		width: 90%;
		height: 100%;
	}
`;

function Calender({ title }) {
	return (
		<Schedule>
			<RenderCalender title={title} />
		</Schedule>
	);
}

export default Calender;
