import React, { FC, useState, useContext, useEffect } from "react";
import { db, storage } from "../../config/firebase";
import { AuthContext } from "../../AuthService";
import { usersData } from "../../atoms_recoil";
import { useRecoilValue } from "recoil";
import { handleCloudUpload } from "../../utils/imageUpload";
import { DbMessage, ImageArr } from "./type";
import Emoji from "../../utils/Emoji";
import { v4 } from "uuid";

//material
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
//icon
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAlt";
import PhotoSizeSelectActualIcon from "@material-ui/icons/PhotoSizeSelectActual";
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(3),
      width: "80%",
    },
    input: {
      display: "none",
    },
    singleImageSize: {
      width: "80%",
      height: "80%",
      margin: theme.spacing(3),
    },
    hoverBg: {
      position: "absolute",
      width: "17%",
      height: "40%",
      textAlign: "right",
      backgroundColor: "rgba(0,0,0,0.5)",
      opacity: 0,
      "&:hover": {
        opacity: 1,
      },
    },
  })
);

type Message = {
  message: string;
  setMessage: (param: string) => void;
  setMessageList: (param: DbMessage[]) => void;
  imageUrl: string;
  setImageUrl: (param: string) => void;
  imageUrls: ImageArr[];
  setImageUrls: (param: ImageArr[]) => void;
};

const Form: FC<Message> = ({
  message,
  setMessage,
  imageUrl,
  setImageUrl,
  imageUrls,
  setImageUrls,
}) => {
  const [selectEmoji, setSelectEmoji] = useState(false);
  const uuid = v4();

  const { user } = useContext(AuthContext);
  const users = useRecoilValue(usersData);
  const classes = useStyles();
  const activeId = users.find((db) => db.id === user.uid)?.activeGroupId;

  //---emoji---//
  const handleEmojiOpen = () => setSelectEmoji(!selectEmoji);
  const onEmojiSelect = (emoji: any) => setMessage(message + emoji.native);
  //--emoji--//

  const handleClickTweet = () => {
    if (!message && message.trim() === "" && !imageUrls) {
      return;
    } else {
      const userRef = db.doc(`users/${user.uid}`);
      db.collection("chat").add({
        createdAt: new Date(),
        content: message,
        image: imageUrls,
        user: userRef,
        groupId: activeId,
      });
      setMessage("");
      setImageUrls([]);
    }
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null && e.target.files) {
      const file = e.target.files[0];
      if (imageUrls.length >= 4) {
        return alert("4枚まで選択可能です");
      } else {
        handleCloudUpload("images", file, setImageUrl);
      }
    }
  };

  useEffect(() => {
    if (imageUrl) setImageUrls([...imageUrls, { id: uuid, url: imageUrl }]);
  }, [imageUrl]);

  const deleteImage = (id: string) => {
    const filterImage = imageUrls.filter((url) => url.id !== id);
    setImageUrls(filterImage);
    if (imageUrls) imageUrls.map((db) => storage.refFromURL(db.url).delete());
  };

  return (
    <>
      <form>
        <Paper>
          <Grid container direction="column" justify="flex-start">
            <Grid item>
              <InputBase
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                multiline
                fullWidth
                placeholder="入力してください"
                className={classes.margin}
              />
            </Grid>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              {imageUrl &&
                imageUrls.map(({ url, id }) => {
                  return (
                    <Grid item xs={3}>
                      <Grid container direction="row" justify="flex-end">
                        <div key={id} className={classes.hoverBg}>
                          <div>
                            <IconButton
                              onClick={() => {
                                deleteImage(id);
                              }}
                            >
                              <CloseIcon />
                            </IconButton>
                          </div>
                        </div>
                      </Grid>
                      <img src={url} className={classes.singleImageSize} />
                    </Grid>
                  );
                })}
            </Grid>
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="flex-end"
            >
              <input
                accept="image/*"
                className={classes.input}
                id="icon-button-file"
                type="file"
                onChange={handleImage}
              />
              <label htmlFor="icon-button-file">
                <IconButton aria-label="upload picture" component="span">
                  <PhotoSizeSelectActualIcon />
                </IconButton>
              </label>
              <IconButton aria-label="emoji" onClick={handleEmojiOpen}>
                <SentimentSatisfiedAltIcon />
              </IconButton>
              <IconButton aria-label="tweet" onClick={handleClickTweet}>
                <RecordVoiceOverIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid item container direction="row" justify="flex-end">
            {selectEmoji && <Emoji {...{ onEmojiSelect, selectEmoji }} />}
          </Grid>
        </Paper>
      </form>
    </>
  );
};

export default Form;
