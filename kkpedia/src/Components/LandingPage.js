import React, { useEffect, useState } from "react";
import styled from "styled-components";
import vedioCover from "../img/StartingSoon.mp4";
import start from "../img/start-button.png";
import clickStart from "../img/start-buttonClick.png";
import ReactCircleModal from "react-circle-modal";
import LoginPage from "./LoginPage";

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	z-index: 3;
	/* position: relative; */
`;

const LandingVedio = styled.video`
	width: 100vmax;
	/* height: 100vh; */
`;

const StartBtn = styled.div`
	width: 20vmin;
	height: 20vmin;
	background-image: url(${start});
	background-repeat: no-repeat;
	background-size: 100%;
	position: absolute;
	left: 30px;
	bottom: 0px;
	z-index: 99;
	&:hover {
		background-image: url(${clickStart});
		background-position-x: 2px;
		background-position-y: 2px;
	}
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

function LandingPage() {
	const [popUpsignin, setPopUpsignin] = useState(false);
	const ShowSignIn = () => {
		setPopUpsignin(!popUpsignin);
	};
	return (
		<Container>
			<LandingVedio autoPlay loop muted>
				<source src={vedioCover} type="video/mp4" />
			</LandingVedio>
			<StartBtn onClick={ShowSignIn} />
			{popUpsignin ? (
				<div>
					<Cover />
					<LoginPage />
				</div>
			) : (
				<LandingVedio autoPlay loop muted>
					<source src={vedioCover} type="video/mp4" />
				</LandingVedio>
			)}
			{/* <ReactCircleModal
				backgroundColor="#2d3436"
				toogleComponent={(StartPage) => <StartBtn onClick={StartPage} />}
				// Optional fields and their default values
				offsetX={0}
				offsetY={0}
			>
				{(StartPage) => (
					<div>
						<Cover />
						<LoginPage />
					</div>
				)}
			</ReactCircleModal> */}
		</Container>
	);
}

export default LandingPage;
