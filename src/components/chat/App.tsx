import React, { useState } from "react";
import Form from "./Form";
// import List from "./List";

const App = () => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  return (
    <>
      <Form {...{ message, setMessage }} />
      {/* <List {...{ message, setMessage, messageList, setMessageList }} /> */}
    </>
  );
};

export default App;
