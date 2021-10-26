import React, { useState, useEffect } from "react";
import firebase from "./utils/firebase";
import Header from "./Components/Header";
import Idol from "./Components/Idol";
import Drama from "./Components/Drama";
import TvShow from "./Components/TvShow";
import LandingPage from "./Components/LandingPage";
import IdolPage from "./Components/IdolPage";
import Profile from "./Components/Profile";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";

function App() {
	const [user, setUser] = useState(null);
	const history = useHistory();
	useEffect(() => {
		firebase.auth().onAuthStateChanged((currentUser) => {
			setUser(currentUser);
			history.push("/");
		});
	}, []);

	return (
		<BrowserRouter>
			<>
				{user ? (
					<>
						<Header />
						<Switch>
							<Route exact path="/" component={Idol}></Route>
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
