import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/elements/Navbar";
import Home from "./components/pages/Home";
import AddPost from "./components/Posts/AddPost";
import Post from "./components/Posts/Post";
import UpdatePost from "./components/Posts/UpdatePost";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/addPost" component={AddPost} />
          <Route exact path="/post/:id" component={Post} />
          <Route exact path="/UpdatePost/:id" component={UpdatePost} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
