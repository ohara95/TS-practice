import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./AuthService";
import Signin from "./components/pages/Signin";
import Signup from "./components/pages/Signup";
import Top from "./components/pages/Top";
import LoggedInRoute from "./LoggedInRoute";
import { RecoilRoot } from "recoil";

const App = () => {
  return (
    // <RecoilRoot>
    <AuthProvider>
      <Router>
        <Switch>
          <LoggedInRoute exact path="/" component={Top} />
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </Router>
    </AuthProvider>
    // </RecoilRoot>
  );
};

export default App;
