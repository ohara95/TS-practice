import React from "react";
import firebase, { db } from "./config/firebase";
import { AuthContext } from "./AuthService";

const { user } = React.useContext(AuthContext);
const usersPath = db.collection("users").doc(user.uid).path;

export type Group = {
  createdAt: firebase.firestore.Timestamp;
  name: string;
  owner: firebase.firestore.DocumentReference;
  users: firebase.firestore.DocumentReference[];
  id: string;
  iconUrl: string;
};

export type Users = {
  name: string;
  id: string;
  avatarUrl: string;
};
