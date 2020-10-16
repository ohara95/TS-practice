import React, { useState, useEffect } from "react";
import { auth, db } from "./config/firebase";
import { groupsData, currentGroupId } from "./atoms_recoil";
import { useSetRecoilState, useRecoilState } from "recoil";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [isCurrentIdOrNot, setIsCurrentIdOrNot] = useState(false);
  const [groups, setGroups] = useRecoilState(groupsData);
  const setCurrentId = useSetRecoilState(currentGroupId);

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
      db.collection("groups")
        .where("users", "array-contains", user.uid)
        .onSnapshot((snapshot) => {
          // console.log(3, "onSnapshot");
          const groupContent = snapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              id: doc.id,
            };
          });
          setGroups(groupContent);
          setIsCurrentIdOrNot(true);
        });
    }
  }, [user]);

  useEffect(() => {
    if (isCurrentIdOrNot) setCurrentId(groups[0].id);
  }, [isCurrentIdOrNot]);

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
// setGroups((g) => {
//   if (currentId === "") {
//     setCurrentId(g[0].id);
//   }
//   return g;
// });
