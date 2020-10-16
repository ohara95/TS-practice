import React, { useContext } from "react";
import { AuthContext } from "./AuthService";
import { atom } from "recoil";
import { Group } from "./typs";

export const userData = atom({
  key: "userData",
  default: null,
});

export const groupsData = atom<Group[]>({
  key: "groupsData",
  default: [],
});

export const currentGroupId = atom({
  key: "currentGroupId",
  default: "",
});

// export const iconData = atom({
//   key: "iconData",
//   default: "",
// });
