import React, { useContext } from "react";
import { AuthContext } from "./AuthService";
import { atom } from "recoil";

type Group = {
  createdAt: firebase.firestore.Timestamp;
  groupName: string;
  owner: any;
  users: any[];
};

export const userData = atom({
  key: "userData",
  default: null,
});

export const groupsData = atom<Group[]>({
  key: "groupsData",
  default: [],
});

export const currentGroupData = atom<Group | null>({
  key: "currentGroupData",
  default: null,
});
