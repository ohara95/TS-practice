import React from "react";
import firebase, { db } from "./config/firebase";
import { AuthContext } from "./AuthService";

const { user } = React.useContext(AuthContext);

export type Group = {
  createdAt: firebase.firestore.Timestamp;
  name: string;
  owner: Users;
  users: Users[];
  id: string;
  iconUrl: string;
};

export type Users = {
  name: string;
  id: string;
  avatarUrl: string;
};
