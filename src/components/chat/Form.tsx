import React, { FC, useState, useContext, useEffect } from "react";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import firebase, { storage } from "../../config/firebase";
import { AuthContext } from "../../AuthService";

//material
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

type DbMessage = {
  content: string;
  createdAt: firebase.firestore.Timestamp;
  groupId: any[];
  // image:string;
  user: any[];
  id: string;
};

type Message = {
  message: string;
  setMessage: (param: string) => void;
  setMessageList: (param: DbMessage[]) => void;
};

const Form: FC<Message> = ({ message, setMessage, setMessageList }) => {
  const [selectEmoji, setSelectEmoji] = useState(false);
  const db = firebase.firestore();
  const { currentGroup, user } = useContext(AuthContext);

  //---emoji---//
  const handleEmojiOpen = () => {
    setSelectEmoji(!selectEmoji);
  };
  const onEmojiSelect = (emoji: any) => {
    setMessage(message + emoji.native);
  };
  //--emoji--//

  const handleClickTweet = () => {
    const userRef = db.collection("users").doc(user.uid);
    db.collection("chat")
      .doc()
      .set({
        createdAt: new Date(),
        content: message,
        // image: imageUrl,
        groupId: db.doc(`groups/${currentGroup}`),
        user: userRef,
      });
    setMessage("");
  };

  return (
    <form>
      <Grid container direction="column" justify="flex-start">
        <Grid item>
          <TextField
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            multiline
            rows={5}
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item>
          <Button>しゃしん</Button>
          <Button onClick={handleEmojiOpen}>えもじ</Button>
          <Button onClick={handleClickTweet}>つぶやく</Button>
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
                marginTop: 10,
                display: "block",
              }}
              native
            />
          )}
        </Grid>
      </Grid>
    </form>
  );
};

export default Form;
