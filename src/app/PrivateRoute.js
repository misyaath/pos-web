import React from "react";
import {Route, Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import AuthContext from "./AuthContext";
import Login from "../Login";

function PrivateRoute({component: Component, scopes, ...rest}) {
  return (
    <AuthContext.Consumer>
      {auth => (
        <Route
          {...rest}
          render={props => {
            if (!auth.isAuthenticated()) return <Login auth={auth}/>;
            return <Component auth={auth} {...props}/>
          }}
        />
      )}
    </AuthContext.Consumer>
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  scopes: PropTypes.array
}

PrivateRoute.defaultProps = {
  scopes: [],
}

export default PrivateRoute;
