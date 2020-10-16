import firebase from "./config/firebase";

export type Group = {
  createdAt: firebase.firestore.Timestamp;
  groupName: string;
  owner: any;
  users: string[];
  id: string;
  iconUrl: string;
};

export type Users = {
  name: string;
  id: string;
  avatarUrl: string;
};
