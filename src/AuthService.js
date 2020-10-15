import React, { useState, useEffect } from "react";
import { auth, db } from "./config/firebase";
import { groupsData, currentGroupData } from "./atoms_recoil";
import { useSetRecoilState } from "recoil";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  // const [groups, setGroups] = useState([]);
  const setGroups = useSetRecoilState(groupsData);
  const setCurrentGroup = useSetRecoilState(currentGroupData);

  useEffect(() => {
    auth.onAuthStateChanged((dbUser) => setUser(dbUser));
  }, []);

  useEffect(() => {
    db.collection("users").onSnapshot((snapshot) => {
      const userContent = snapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });
      setUsers(userContent);
    });
  }, []);

  useEffect(() => {
    if (user) {
      db.collection("groups")
        .where("users", "array-contains", user.uid)
        .onSnapshot((snapshot) => {
          const groupContent = snapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              id: doc.id,
            };
          });
          setCurrentGroup(groupContent[0]);
          setGroups(groupContent);
        });
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        users,
        setUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
