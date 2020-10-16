import React, { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import Form from "./Form";
import Lists from "./Lists";
import { DbMessage } from "./type";

const App = () => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState<DbMessage[]>([]);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    db.collection("chat")
      .orderBy("createdAt", "desc")
      .onSnapshot(async (snapshot) => {
        const pullMessage = await Promise.all(
          snapshot.docs.map(async (doc) => {
            const userRef = await doc.data().user;
            const groupRef = await doc.data().groupId;
            return {
              ...doc.data(),
              id: doc.id,
              groupId: groupRef,
              user: userRef,
            };
          })
        );
        setMessageList(pullMessage as any);
      });
  }, []);

  return (
    <>
      <Form
        {...{ message, setMessage, setMessageList, imageUrl, setImageUrl }}
      />
      <Lists {...{ messageList }} />
    </>
  );
};

export default App;
