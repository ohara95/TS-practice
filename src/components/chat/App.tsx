import React, { useState, useEffect, useContext } from "react";
import { db } from "../../config/firebase";
import Form from "./Form";
import Lists from "./Lists";
import { DbMessage, ImageArr } from "./type";
import { AuthContext } from "../../AuthService";

const App = () => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState<DbMessage[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [imageUrls, setImageUrls] = useState<ImageArr[]>([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const userRef = db.collection("users").doc(user.uid);
    db.collection("chat")
      .where("user", "==", userRef)
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
