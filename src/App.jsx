import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import LeftSidebar from './components/LeftSidebar'
import RightSidebar from './components/RightSidebar'
import Feed from './components/Feed'
import UserProfile from "./components/UserProfile";
import styled from 'styled-components'
import './App.css';

const MainContainer = styled.div`
  display: flex;
  font-family: Roboto;
  margin: 0 45px;
`

const App = () => {
  return (
    <Router>
      <MainContainer>
        <LeftSidebar />

        <Switch>
          <Route path="/" exact>
            <Feed />
            <RightSidebar />
          </Route>

          <Route path="/user/:id" exact>
            <UserProfile />
            <RightSidebar />
          </Route>

        </Switch>

      </MainContainer>
        
    </Router>

    
  );
}

export default App;
