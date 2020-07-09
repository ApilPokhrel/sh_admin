import React from 'react';

const AuthContext = React.createContext({
  isAuthorized: true,
  isAuthenticated: true,
  checkAuth: () => {},
  user: {}
});

export default AuthContext;