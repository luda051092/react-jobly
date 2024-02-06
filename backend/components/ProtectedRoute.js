import React from "react";
import { Route, Redirect } from "react-router-dom";
import JoblyApi from "./JoblyApi";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const isAuthenticated = JoblyApi.token;

    return (
        <Route
          {...rest}
          render={(props) => 
            isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
        }
      />
    );
};

export default ProtectedRoute;