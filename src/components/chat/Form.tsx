import React, { FC, useState } from "react";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { Message } from "./type";
import firebase, { storage } from "../../config/firebase";

//material
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const Form: FC<Message> = ({ message, setMessage }) => {
  const [selectEmoji, setSelectEmoji] = useState(false);
  const db = firebase.firestore();

  //---emoji---//
  const handleEmojiOpen = () => {
    setSelectEmoji(!selectEmoji);
  };

  const onEmojiSelect = (emoji: any) => {
    setMessage(message + emoji.native);
  };
  //--emoji--//

  const handleClickTweet = () => {
    // const userRef = db.collection("users").doc(user.uid);
    db.collection("chat").doc().set({
      createdAt: new Date(),
      content: message,
      // image: imageUrl,
      // groupId: currentGroup,
      // createUser: userRef,
    });
  };

  return (
    <form>
      <TextField
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        multiline
        rows={5}
        variant="outlined"
      />
      {selectEmoji && (
        <Picker
          onClick={(emoji) => onEmojiSelect({ ...emoji, selectEmoji })}
          i18n={{
            search: "検索",
            categories: {
              search: "検索結果",
              recent: "よく使う絵文字",
              people: "顔 & 人",
              nature: "動物 & 自然",
              foods: "食べ物 & 飲み物",
              activity: "アクティビティ",
              places: "旅行 & 場所",
              objects: "オブジェクト",
              symbols: "記号",
              flags: "旗",
              custom: "カスタム",
            },
          }}
          style={{
            position: "absolute",
            zIndex: 1,
            marginTop: 40,
          }}
          native
        />
      )}

      <Button onClick={handleEmojiOpen}>えもじ</Button>
      <Button onClick={handleClickTweet}>つぶやく</Button>
    </form>
  );
};

export default Form;
