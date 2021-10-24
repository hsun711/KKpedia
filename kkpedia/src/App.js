import React from "react";
import Header from "./Components/Header";
import Idol from "./Components/Idol";
import Drama from "./Components/Drama";
import TvShow from "./Components/TvShow";
import LandingPage from "./Components/LandingPage";
import IdolPage from "./Components/IdolPage";
import Profile from "./Components/Profile";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import EachLocation from "./Components/EachLocation";

function App() {
	return (
		<BrowserRouter>
			<Route exact path="/" component={LandingPage}></Route>
			<Header />
			<Switch>
				<Route exact path="/idol" component={Idol}></Route>
				<Route exact path="/drama" component={Drama}></Route>
				<Route exact path="/tvshow" component={TvShow}></Route>
				<Route exact path="/profile" component={Profile}></Route>
				<Route exact path="/:title" component={IdolPage}></Route>
				{/* <Route exact path="/place/:location" component={EachLocation}></Route> */}
			</Switch>
		</BrowserRouter>
	);
}

export default App;
