import firebase from "./config/firebase";

export type Group = {
  createdAt: firebase.firestore.Timestamp;
  groupName: string;
  owner: any;
  users: any[];
  id: string;
  iconUrl: string;
};
