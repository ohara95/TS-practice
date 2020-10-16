import React, { FC, useState, useContext, useEffect } from "react";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { db } from "../../config/firebase";
import { AuthContext } from "../../AuthService";
import { currentGroupId } from "../../atoms_recoil";
import { useRecoilValue } from "recoil";
import { handleCloudUpload } from "../../utils/imageUpload";
import { DbMessage } from "./type";
import ImageDialog from "../organisms/ImageDialog";

//material
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAlt";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";

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
    marginSpace: {
      margin: theme.spacing(1),
    },
  })
);

type Message = {
  message: string;
  setMessage: (param: string) => void;
  setMessageList: (param: DbMessage[]) => void;
  imageUrl: string;
  setImageUrl: (param: string) => void;
};

const Form: FC<Message> = ({ message, setMessage, imageUrl, setImageUrl }) => {
  const [selectEmoji, setSelectEmoji] = useState(false);
  const [open, setOpen] = useState(false);

  const { user } = useContext(AuthContext);
  const currentId = useRecoilValue(currentGroupId);
  const classes = useStyles();

  //---emoji---//
  const handleEmojiOpen = () => setSelectEmoji(!selectEmoji);
  const onEmojiSelect = (emoji: any) => setMessage(message + emoji.native);
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
          image: imageUrl,
          groupId: db.doc(`groups/${currentId}`),
          user: userRef,
        });
      setMessage("");
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // memo 複数画像検討
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const file = e.target.files[0];
      handleCloudUpload("images", file, setImageUrl);
    }
  };

  // useEffect(()=>{
  //   if(imageUrl){
  //     db.collection('chat').id()
  //   }
  // },[imageUrl])

  return (
    <>
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
              // InputProps={{
              //   endAdornment: (
              //     <IconButton edge="end" style={{ fontSize: 15 }}>
              //       つぶやく
              //     </IconButton>
              //   ),
              // }}
            />
          </Grid>
          <Grid item>
            <IconButton aria-label="image" onClick={handleOpen}>
              <AddAPhotoIcon />
            </IconButton>
            <IconButton aria-label="emoji" onClick={handleEmojiOpen}>
              <SentimentSatisfiedAltIcon />
            </IconButton>
            <IconButton aria-label="tweet" onClick={handleClickTweet}>
              <RecordVoiceOverIcon />
            </IconButton>
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
        <ImageDialog
          onClick={handleClose}
          open={open}
          title="画像アップロード"
          onChange={handleImage}
        />
      </form>
    </>
  );
};

export default Form;
