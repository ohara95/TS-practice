export type Message = {
  message: string;
  setMessage: (param: string) => void;
};

export type DbMessage = {
  content: string;
  createdAt: firebase.firestore.Timestamp;
  groupId: any[];
  image: string;
  user: any;
  id: string;
};
