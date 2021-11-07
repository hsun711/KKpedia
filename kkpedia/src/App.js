import React, { useState, useEffect } from "react";
import styled from "styled-components";
import firebase from "./utils/firebase";
import Header from "./Components/Header";
import Idol from "./Components/Idol";
import Drama from "./Components/Drama";
import TvShow from "./Components/TvShow";
import LandingPage from "./Components/LandingPage";
import LoginPage from "./Components/LoginPage";
import IdolPage from "./Components/IdolPage";
import Profile from "./Components/Profile";
import SearchResult from "./Components/SearchResult";
import Home from "./Components/Home";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const MainContainer = styled.div`
	width: 100%;
	padding-top: 7vmin;
	display: flex;
	flex-direction: column;
`;

function App() {
	const [user, setUser] = useState(null);
	const db = firebase.firestore();

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
						<MainContainer>
							<Switch>
								<Route exact path="/" component={Home}></Route>
								<Route exact path="/idol" component={Idol}></Route>
								<Route exact path="/drama" component={Drama}></Route>
								<Route exact path="/tvshow" component={TvShow}></Route>
								<Route path="/tvshow/:title">
									<IdolPage topic="tvshow" />
								</Route>
								<Route exact path="/profile" component={Profile}></Route>
								<Route path="/search/:search">
									<SearchResult />
								</Route>
								<Route path="/idol/:title">
									<IdolPage topic="idol" />
								</Route>
								<Route path="/drama/:title">
									<IdolPage topic="drama" />
								</Route>
							</Switch>
						</MainContainer>
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
