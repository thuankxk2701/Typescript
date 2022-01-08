import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from "./components/signIn/SignIn";
import SignUp from "./components/signUp/SignUp";
import Home from "./components/home/Home";
import Product from "./components/product/Product";
import UserProfile from "./components/userAcount/userProfile/UserProfile";

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signIn" component={SignIn} />
        <Route exact path="/signUp" component={SignUp} />
        <Route exact path="/product-:id" component={Product} />
        <Route exact path="/user/account/:name" component={UserProfile} />
      </Switch>
    </Router>
  );
};

export default App;
