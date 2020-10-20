import React, { useState, useEffect } from "react";
import { auth, db } from "./config/firebase";
import { groupsData, currentGroupId, usersData } from "./atoms_recoil";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isCurrentId, setIsCurrentId] = useState(false);
  const [groups, setGroups] = useRecoilState(groupsData);
  const setCurrentId = useSetRecoilState(currentGroupId);
  const [users, setUsers] = useRecoilState(usersData);
  const currentId = useRecoilValue(currentGroupId);
  const activeId = users.find((db) => db.id === user?.uid)?.activeGroupId;

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
      const userRef = db.collection("users").doc(user.uid);
      db.collection("groups")
        .where("users", "array-contains", userRef)
        .onSnapshot(async (snap) => {
          const groupContent = await Promise.all(
            snap.docs.map(async (doc) => {
              const owner = await doc
                .data()
                .owner.get()
                .then((res) => res.data());

              const dbUser = await Promise.all(
                doc.data().users.map((db) => db.get().then((res) => res.data()))
              );
              return {
                ...doc.data(),
                id: doc.id,
                owner,
                users: dbUser,
              };
            })
          );
          setGroups(groupContent);
          setIsCurrentId(true);
        });
    }
  }, [user]);

  useEffect(() => {
    if (!isCurrentId) {
      setUsers(
        users.map((db) => {
          if (db.id === user.uid) {
            return {
              ...db,
              activeGroupId: groups[0]?.id,
            };
          } else {
            return db;
          }
        })
      );
    }
  }, [isCurrentId]);
  // useEffect(() => {
  //   if (isCurrentId) {
  //     if (activeGroup) {
  //       setCurrentId(activeId);
  //     } else {
  //       if (groups.length) setCurrentId(groups[0].id);
  //     }
  //   }
  // }, [isCurrentId]);

  // useEffect(() => {
  //   if (!activeId) {
  //     setUsers(
  //       users.map((db) => {
  //         if (db.id === user.uid) {
  //           return {
  //             ...db,
  //             activeGroupId: groups[0]?.id,
  //           };
  //         } else {
  //           return db;
  //         }
  //       })
  //     );
  //   }
  // }, [groups, currentId]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
