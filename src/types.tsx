import firebase from "./config/firebase";

export type Group = {
  createdAt: firebase.firestore.Timestamp;
  name: string;
  owner: Users;
  users: Users[];
  id: string;
  iconUrl: string;
  favorite: boolean;
};

export type Users = {
  name: string;
  id: string;
  avatarUrl: string;
  activeGroupId: string;
};
