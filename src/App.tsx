import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signin from "./components/pages/Signin";
import Signup from "./components/pages/Signup";
import Top from "./components/pages/Top";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Top} />
        <Route path="/Signin" component={Signin} />
        <Route path="/Signup" component={Signup} />
      </Switch>
    </Router>
  );
};

export default App;
