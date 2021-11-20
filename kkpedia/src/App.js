import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
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
import PageNotFound from "./Components/PageNotFound";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { getCurrentUser } from "./state/actions";

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
	const [user, setUser] = useState();
	const db = firebase.firestore();
	const [allCategory, setAllCategory] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		firebase.auth().onAuthStateChanged((currentUser) => {
			setUser(currentUser);
			dispatch(getCurrentUser(currentUser));
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

	return (
		<BrowserRouter>
			<>
				{user === null ? (
					<LandingPage />
				) : (
					<>
						{user !== undefined ? (
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
										<Route path="/profile">
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
										<Route path="">
											<PageNotFound />
										</Route>
									</Switch>
								</MainContainer>
							</>
						) : (
							<Loading />
						)}
					</>
				)}
			</>
		</BrowserRouter>
	);
}

export default App;
