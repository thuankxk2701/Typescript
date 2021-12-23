import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from "./components/signIn/SignIn";
import SignUp from "./components/signUp/SignUp";
import Home from "./components/home/Home";

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signIn" component={SignIn} />
        <Route exact path="/signUp" component={SignUp} />
      </Switch>
    </Router>
  );
};

export default App;
