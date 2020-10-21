import React, { useState, useEffect } from "react";
import { auth, db } from "./config/firebase";
import { groupsData, usersData, isLoading } from "./atoms_recoil";
import { useRecoilState, useSetRecoilState } from "recoil";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isCurrentId, setIsCurrentId] = useState(false);
  const [groups, setGroups] = useRecoilState(groupsData);
  const [users, setUsers] = useRecoilState(usersData);
  const setLoading = useSetRecoilState(isLoading);

  useEffect(() => {
    auth.onAuthStateChanged((dbUser) => {
      setUser(dbUser);
      if (dbUser == null) setLoading(false);
    });
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

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
