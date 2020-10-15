import React, { useState, useContext } from "react";
import { AuthContext } from "../AuthService";
import firebase, { db, storage } from "../config/firebase";
// import { next, error, complete } from "../utils/imageUpload";
import { v4 } from "uuid";
//material
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import TextField from "@material-ui/core/TextField";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { grey } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import CardMedia from "@material-ui/core/CardMedia";
//icon
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: grey[500],
  },
}));

// type Users = {
//   name: string;
//   id: string;
// };

// type Context = {
//   user: firebase.User | null;
//   users: Users[];
// };

const Profile = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [username, setUsername] = useState("");
  const [avatarImage, setAvatarImage] = useState<File>();
  const [avatarUrl, setAvatarImageUrl] = useState("");
  const [groupName, setGroupName] = useState("");
  const { user, users } = useContext(AuthContext);
  const uuid = v4();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const changeName = () => {
    if (username) {
      db.collection("users")
        .doc(user.uid)
        .update({
          name: username,
        })
        .then()
        .catch((err) => console.log(err));
    }
  };

  const displayName = () => {
    if (users && user) {
      const findUser = users.find(
        (storeUser: any) => storeUser.id === user.uid
      );
      if (findUser) {
        return findUser.name;
      }
    }
  };

  const onImageSubmit = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    if (file) {
      setAvatarImage(file);
    }
  };

  const uploadAvatar = () => {
    if (!avatarImage) {
      return alert("ファイルを選択されていません");
    }
    const uploadTask = storage.ref(`/avatars/${uuid}`).put(avatarImage);
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      next,
      error,
      complete
    );
  };

  const next = (snapshot: any) => {
    const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log(percent + "% done");
  };

  const error = (err: any) => console.log(err);

  const complete = () => {
    storage
      .ref("avatars")
      .child(uuid)
      .getDownloadURL()
      .then((url) => {
        setAvatarImageUrl(url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addGroup = () => {
    setGroupName("");
    db.collection("groups")
      .doc()
      .set({
        groupName,
        owner: user.uid,
        users: firebase.firestore.FieldValue.arrayUnion(user.uid),
        createdAt: new Date(),
      });
  };

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image="/" />
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <AccountCircleIcon />
          </Avatar>
        }
        title={displayName()}
      />
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon color="secondary" />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>設定</Typography>
          <form>
            <TextField
              label="Name"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              placeholder={displayName()}
            />
            <Button onClick={changeName}>変更</Button>
            <div style={{ marginTop: 10 }}>
              <input
                id="contained-button-file"
                multiple
                type="file"
                style={{ display: "none" }}
              />
              {/* <label htmlFor="contained-button-file"> */}
              <Button
                onClick={onImageSubmit}
                variant="outlined"
                component="span"
              >
                画像アップロード
              </Button>
              {/* </label> */}
            </div>
            <TextField
              value={groupName}
              onChange={(e) => {
                setGroupName(e.target.value);
              }}
              label="CreateRoom"
            />
            <Button onClick={addGroup}>作成</Button>
          </form>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Profile;
