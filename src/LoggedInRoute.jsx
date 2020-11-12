import React, { useContext } from "react";
import { useRecoilValue } from "recoil";
import { isLoading } from "./atoms_recoil";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./AuthService";
import Spinner from "./components/pages/Spinner";

const LoggedInRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);
  const loading = useRecoilValue(isLoading);
  if (loading) {
    return <Spinner />;
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to={"/signin"} />
      }
    />
  );
};

export default LoggedInRoute;
