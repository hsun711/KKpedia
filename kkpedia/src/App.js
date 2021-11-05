import React, { useState, useEffect } from "react";
import firebase from "./utils/firebase";
import Header from "./Components/Header";
import Idol from "./Components/Idol";
import Drama from "./Components/Drama";
import TvShow from "./Components/TvShow";
import LandingPage from "./Components/LandingPage";
import LoginPage from "./Components/LoginPage";
import IdolPage from "./Components/IdolPage";
import Profile from "./Components/Profile";
import EachLocation from "./Components/EachLocation";
import SearchResult from "./Components/SearchResult";
import PersonalPost from "./Components/PersonalPost";
import PersonalData from "./Components/PersonalData";
import PersonalCollection from "./Components/PersonalCollection";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";

function App() {
	const [user, setUser] = useState(null);
	const db = firebase.firestore();
	// const history = useHistory();
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
