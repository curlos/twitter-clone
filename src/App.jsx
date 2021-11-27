import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import styled from 'styled-components'
import { useContext } from 'react'
import { AuthContext } from './context/auth/AuthContext'
import Authentication from './components/Authentication'
import { AuthContextProvider } from './context/auth/AuthContext'
import { TweetsContextProvider } from './context/tweets/TweetsContext'

import LeftSidebar from './components/LeftSidebar'
import RightSidebar from './components/RightSidebar'
import Feed from './components/Feed'
import UserProfile from "./components/UserProfile";
import TweetPage from "./components/TweetPage";
import UserFollowsPage from "./components/UserFollowsPage";

const MainContainer = styled.div`
  display: flex;
  margin: 0 45px;

  a {
    color: #fff;
  }
`

const App = () => {

  return (
    <AuthContextProvider>
      <TweetsContextProvider>
        <Router>
          <Switch>
            <Route path="/" exact>
              <MainContainer>
                <LeftSidebar />
                <Feed />
                <RightSidebar />
              </MainContainer>
            </Route>

            <Route path="/register" exact>
              <Authentication type="register"/>
            </Route>

            <Route path="/login" exact>
              <Authentication type="login"/>
            </Route>

            <Route path="/:authorID/status/:tweetID" exact>
              <MainContainer>
                <LeftSidebar />
                <TweetPage />
                <RightSidebar />
              </MainContainer>
            </Route>

            <Route path="/user/:id/following" exact>
              <MainContainer>
                <LeftSidebar />
                <UserFollowsPage />
                <RightSidebar />
              </MainContainer>
            </Route>

            <Route path="/user/:id/followers" exact>
              <MainContainer>
                <LeftSidebar />
                <UserFollowsPage />
                <RightSidebar />
              </MainContainer>
            </Route>

            <Route path="/user/:id" exact>
              <MainContainer>
                <LeftSidebar />
                <UserProfile />
                <RightSidebar />
              </MainContainer>
            </Route>
          </Switch>
            
        </Router>
      </TweetsContextProvider>
    </AuthContextProvider>

    
  );
}

export default App;
