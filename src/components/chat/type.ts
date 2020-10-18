import firebase from "../../config/firebase";

export type DbMessage = {
  content: string;
  createdAt: firebase.firestore.Timestamp;
  image: ImageArr[];
  user: firebase.firestore.DocumentReference;
  id: string;
  groupId: string;
};

export type ImageArr = {
  id: string;
  url: string;
};
