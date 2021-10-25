import React, { useState, useEffect } from "react";
import styled from "styled-components";
import firebase from "./utils/firebase";
import LoginPage from "./Components/LoginPage";
import Header from "./Components/Header";
import Idol from "./Components/Idol";
import Drama from "./Components/Drama";
import TvShow from "./Components/TvShow";
import LandingPage from "./Components/LandingPage";
import IdolPage from "./Components/IdolPage";
import Profile from "./Components/Profile";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import EachLocation from "./Components/EachLocation";

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

function App() {
	const [user, setUser] = useState(null);
	useEffect(() => {
		firebase.auth().onAuthStateChanged((currentUser) => {
			setUser(currentUser);
		});
	}, []);
	return (
		<BrowserRouter>
			<>
				{user ? (
					<>
						<Header />
						<Switch>
							<Route exact path="/idol" component={Idol}></Route>
							<Route exact path="/drama" component={Drama}></Route>
							<Route exact path="/tvshow" component={TvShow}></Route>
							<Route exact path="/profile" component={Profile}></Route>
							<Route exact path="/:title" component={IdolPage}></Route>
							{/* <Route exact path="/:title/picture" component={EachLocation}></Route> */}
						</Switch>
					</>
				) : (
					<>
						<LandingPage />
					</>
				)}
			</>
		</BrowserRouter>
	);
}

export default App;
