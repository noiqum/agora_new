import React from "react";
import "./App.css";
import Navbar from "./components/navbar/navbar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Container from "./components/container/container";
import Login from "./components/auth/login";
import Signup from "./components/auth/signup";
import EventDetail from "./components/eventDetail/eventDetail";
import Profile from "./components/profile/profile";
import Update from "./components/update/update";
import People from "./components/people/people";
import PeopleDetail from "./components/people-detail/peopleDetail";
import Search from "./components/search/search";
import DirectHub from "./components/people-detail/directHub";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Container} />
          <Route path="/search" component={Search} />
          <Route path="/people" exact component={People} />
          <Route
            path="/people/:peopleid"
            exact
            strict
            render={({ match }) => <PeopleDetail id={match.params.peopleid} />}
          />
          <Route
            path="/people/people/:peopleid"
            exact
            strict
            render={({ match }) => <DirectHub id={match.params.peopleid} />}
          />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/event-detail/:id" exact component={EventDetail} />
          <Route path="/profile" component={Profile} />
          <Route path="/update/:eventid" exact component={Update} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
