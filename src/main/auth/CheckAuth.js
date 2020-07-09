import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import Api from "../services/ApiService";
import R from "../app/auth/Services";

function CheckAuth({ children, ...rest }) {
  const [isAuthorized, setIsAuthorized] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    // checkAuth();
  });

  let checkAuth = () => {
    Api(R.apiRoutes.checkAuth, {})
      .then(d => {
        setIsAuthenticated(d.isAuthenticated);
        setIsAuthorized(d.isAuthorized);
      })
      .catch(e => {
        setIsAuthenticated(false);
        setIsAuthorized(false);
      });
  };

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          isAuthorized ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/403",
                state: { from: location }
              }}
            />
          )
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default CheckAuth;
