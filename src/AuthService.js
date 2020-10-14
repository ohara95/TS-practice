import React, { useState, useEffect } from "react";
import { auth } from "./config/firebase";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    auth.onAuthStateChanged((dbUser) => setUser(dbUser));
  }, []);

  return (
    <AuthContext.Provider value={(user, setUser)}>
      {children}
    </AuthContext.Provider>
  );
};
