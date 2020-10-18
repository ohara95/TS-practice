import React, { useState, useEffect } from "react";
import { auth, db } from "./config/firebase";
import { groupsData, currentGroupId, usersData } from "./atoms_recoil";
import { useSetRecoilState, useRecoilState } from "recoil";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isCurrentId, setIsCurrentId] = useState(false);
  const [groups, setGroups] = useRecoilState(groupsData);
  const [currentId, setCurrentId] = useRecoilState(currentGroupId);
  const setUsers = useSetRecoilState(usersData);

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
    // console.log(1, "useEffect");
    if (user) {
      // console.log(2, "useEffect + user");
      const userPath = db.collection("users").doc(user.uid).path;
      const userRef = db.collection("users").doc(user.uid);
      db.collection("groups")
        .where("users", "array-contains", userRef)
        .onSnapshot((snap) => {
          // console.log(3, "onSnapshot");
          const groupContent = snap.docs.map((doc) => {
            return {
              ...doc.data(),
              id: doc.id,
            };
          });
          setGroups(groupContent);
          // setIsCurrentId(true);
        });
    }
  }, [user]);

  // useEffect(() => {
  //   if (isCurrentId && !currentId) setCurrentId(groups[0].id);
  // }, [isCurrentId]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
