import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import firebase from "./utils/firebase";
import Header from "./Components/common/Header";
import Idol from "./Components/topic/Idol";
import Drama from "./Components/topic/Drama";
import TvShow from "./Components/topic/TvShow";
import LandingPage from "./Components/common/LandingPage";
import Loading from "./Components/common/Loading";
import IdolPage from "./Components/topic/IdolPage";
import Profile from "./Components/personal/Profile";
import SearchResult from "./Components/common/SearchResult";
import Home from "./Components/common/Home";
import PageNotFound from "./Components/common/PageNotFound";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { getCurrentUser } from "./state/actions";
import { Context } from "./utils/Context";

const MainContainer = styled.div`
  max-width: 1560px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  width: 100%;
`;

function App() {
  const [user, setUser] = useState();
  const db = firebase.firestore();
  const dispatch = useDispatch();
  const [category, setCategory] = useState([]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      dispatch(getCurrentUser(currentUser));
    });

    db.collection("categories").onSnapshot((querySnapshot) => {
      const item = [];
      querySnapshot.forEach((doc) => {
        item.push(doc.data());
      });
      setCategory(item);
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
                      <Context.Provider value={category}>
                        <SearchResult />
                      </Context.Provider>
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
