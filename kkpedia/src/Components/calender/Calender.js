import React, { useEffect } from "react";
import styled from "styled-components";
import RenderCalender from "./RenderCalender";

const Schedule = styled.div`
	width: 85%;
	height: 40%;
	background-color: rgba(256, 256, 256, 0.8);
	padding: 5vmin 3vmin;
	border-radius: 10px;
	align-items: center;
	box-shadow: 10px 10px 30px 5px rgba(0, 0, 0, 0.2);
	@media screen and (max-width: 1200px) {
		width: 90%;
	}
`;

function Calender({ title, setActiveItem }) {
	useEffect(() => {
		setActiveItem("idolschedule");
	}, []);

	return (
		<Schedule>
			<RenderCalender title={title} />
		</Schedule>
	);
}

export default Calender;
