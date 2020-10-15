import React, { FC, useState, useContext, useEffect } from "react";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import firebase, { storage } from "../../config/firebase";
import { AuthContext } from "../../AuthService";
import { currentGroupId } from "../../atoms_recoil";
import { useRecoilValue } from "recoil";

//material
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import clsx from "clsx";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
    },
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: "25ch",
    },
  })
);

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
  const { user } = useContext(AuthContext);
  const currentId = useRecoilValue(currentGroupId);
  const classes = useStyles();

  //---emoji---//
  const handleEmojiOpen = () => {
    setSelectEmoji(!selectEmoji);
  };
  const onEmojiSelect = (emoji: any) => {
    setMessage(message + emoji.native);
  };
  //--emoji--//

  const handleClickTweet = () => {
    if (!message) {
      return;
    } else {
      const userRef = db.collection("users").doc(user.uid);
      db.collection("chat")
        .doc()
        .set({
          createdAt: new Date(),
          content: message,
          // image: imageUrl,
          groupId: db.doc(`groups/${currentId}`),
          user: userRef,
        });
      setMessage("");
    }
  };

  return (
    <>
      {/* これ参考にForm内にボタン入れたい */}
      {/* <FormControl className={clsx(classes.margin, classes.textField)}>
        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
        <Input
          id="standard-adornment-password"
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility">
                <Visibility />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
 */}
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
    </>
  );
};

export default Form;
