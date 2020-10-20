import { atom } from "recoil";
import { Group, Users } from "./types";

export const usersData = atom<Users[]>({
  key: "usersData",
  default: [],
});

export const groupsData = atom<Group[]>({
  key: "groupsData",
  default: [],
});

export const currentGroupId = atom({
  key: "currentGroupId",
  default: "",
});

export const isLoading = atom({
  key: "isLoading",
  default: false,
});
