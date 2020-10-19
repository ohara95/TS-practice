import React, { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import Form from "./Form";
import Lists from "./Lists";
import { DbMessage, ImageArr } from "./type";

const App = () => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState<DbMessage[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [imageUrls, setImageUrls] = useState<ImageArr[]>([]);

  useEffect(() => {
    db.collection("chat")
      .orderBy("createdAt", "desc")
      .onSnapshot((snap) => {
        const dbMessage = snap.docs.map((doc) => {
          return {
            ...(doc.data() as DbMessage),
            id: doc.id,
          };
        });
        setMessageList(dbMessage);
      });
  }, []);

  return (
    <>
      <Form
        {...{
          message,
          setMessage,
          setMessageList,
          imageUrl,
          setImageUrl,
          imageUrls,
          setImageUrls,
        }}
      />
      <Lists {...{ messageList }} />
    </>
  );
};

export default App;
