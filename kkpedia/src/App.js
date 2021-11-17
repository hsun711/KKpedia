import React, { useState, useEffect } from "react";
import styled from "styled-components";
import firebase from "./utils/firebase";
import Header from "./Components/Header";
import Idol from "./Components/Idol";
import Drama from "./Components/Drama";
import TvShow from "./Components/TvShow";
import LandingPage from "./Components/LandingPage";
import Loading from "./Components/Loading";
import IdolPage from "./Components/IdolPage";
import Profile from "./Components/Profile";
import SearchResult from "./Components/SearchResult";
import Home from "./Components/Home";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const MainContainer = styled.div`
	max-width: 1560px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	/* border: 1px solid black; */
`;

const Container = styled.div`
	width: 100%;
`;

function App() {
	const users = firebase.auth().currentUser;
	const [user, setUser] = useState(null);
	const db = firebase.firestore();
	const [allCategory, setAllCategory] = useState([]);

	useEffect(() => {
		firebase.auth().onAuthStateChanged((currentUser) => {
			setUser(currentUser);
		});

		db.collection("categories")
			.get()
			.then((querySnapshot) => {
				const item = [];
				querySnapshot.forEach((doc) => {
					// console.log(doc.data());
					item.push(doc.data());
				});
				setAllCategory(item);
			});
	}, []);

	// console.log(users);
	// console.log(isLogin);
	// console.log(user);
	return (
		<BrowserRouter>
			<>
				{/* {isLogin ? null : <LandingPage setIsLogin={setIsLogin} />} */}

				{user !== null ? (
					<>
						<Header />
						<MainContainer>
							<Switch>
								<Route exact path="/">
									<Container>
										<Home />
									</Container>
								</Route>
								<Route exact path="/idol">
									<Container>
										<Idol />
									</Container>
								</Route>
								<Route exact path="/drama">
									<Container>
										<Drama />
									</Container>
								</Route>
								<Route exact path="/tvshow">
									<Container>
										<TvShow />
									</Container>
								</Route>
								<Route exact path="/profile">
									<Container>
										<Profile />
									</Container>
								</Route>
								<Route path="/search/:search">
									<SearchResult allCategory={allCategory} />
								</Route>
								<Route path="/tvshow/:title">
									<IdolPage topic="tvshow" />
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
					<LandingPage />
				)}

				{/* {user !== null ? (
					<>
						{(isLogin || user !== null) && (
							<>
								<Header />
								<MainContainer>
									<Switch>
										<Route exact path="/">
											<Container>
												<Home />
											</Container>
										</Route>
										<Route exact path="/idol">
											<Container>
												<Idol />
											</Container>
										</Route>
										<Route exact path="/drama">
											<Container>
												<Drama />
											</Container>
										</Route>
										<Route exact path="/tvshow">
											<Container>
												<TvShow />
											</Container>
										</Route>
										<Route exact path="/profile">
											<Container>
												<Profile />
											</Container>
										</Route>
										<Route path="/tvshow/:title">
											<IdolPage topic="tvshow" />
										</Route>
										<Route path="/search/:search">
											<SearchResult allCategory={allCategory} />
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
						)}
						{(!isLogin || user === null) && <Loading />}
					</>
				) : (
					<Loading />
				)} */}
				{/* {user !== null ? (
					<>
						<Header />
						<MainContainer>
							<Switch>
								<Route exact path="/">
									<Container>
										<Home />
									</Container>
								</Route>
								<Route exact path="/idol">
									<Container>
										<Idol />
									</Container>
								</Route>
								<Route exact path="/drama">
									<Container>
										<Drama />
									</Container>
								</Route>
								<Route exact path="/tvshow">
									<Container>
										<TvShow />
									</Container>
								</Route>
								<Route exact path="/profile">
									<Container>
										<Profile />
									</Container>
								</Route>
								<Route path="/tvshow/:title">
									<IdolPage topic="tvshow" />
								</Route>
								<Route path="/search/:search">
									<SearchResult allCategory={allCategory} />
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
					<LandingPage />
				)} */}
			</>
		</BrowserRouter>
	);
}

export default App;
