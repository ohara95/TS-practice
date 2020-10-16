import React, { useState, useContext } from "react";
import { AuthContext } from "../AuthService";
import firebase, { db, storage, auth } from "../config/firebase";
import defaultUser from "../img/user.jpg";
import { handleCloudUpload } from "../utils/imageUpload";
// import { next, error, complete } from "../utils/imageUpload";
//material
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import TextField from "@material-ui/core/TextField";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { grey } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import CardMedia from "@material-ui/core/CardMedia";
//icon
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Tooltip from "@material-ui/core/Tooltip";
import CopyToClipBoard from "react-copy-to-clipboard";
import InputAdornment from "@material-ui/core/InputAdornment";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "80%",
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
  const [openTip, setOpenTip] = useState(false);
  const { user, users } = useContext(AuthContext);

  const handleExpandClick = () => setExpanded(!expanded);
  const handleCloseTip = () => setOpenTip(false);
  const handleClickButton = () => setOpenTip(true);

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

  const onImageSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const file = e.target.files[0];
      setAvatarImage(file);
    }
  };

  const uploadAvatar = () => {
    if (!avatarImage) {
      return alert("ファイルを選択されていません");
    } else {
      handleCloudUpload("avatars", avatarImage);
    }
  };

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={defaultUser} />
      <CardHeader title={displayName()} />
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
          <form style={{ lineHeight: 5 }}>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item xs={9}>
                <TextField
                  label="Name"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  placeholder={displayName()}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={3}>
                <Button onClick={changeName}>変更</Button>
              </Grid>
            </Grid>
            <form onSubmit={uploadAvatar}>
              <input
                id="contained-button-file"
                type="file"
                onChange={onImageSubmit}
                style={{ display: "none" }}
              />
              <label htmlFor="contained-button-file">
                <Button variant="outlined" component="span" fullWidth>
                  画像アップロード
                </Button>
              </label>
            </form>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item xs={9}>
                <TextField
                  type="text"
                  label="ID"
                  disabled
                  defaultValue={user && user.uid}
                  fullWidth
                />
              </Grid>
              <Grid item xs={3}>
                <InputAdornment position="end">
                  <Tooltip
                    arrow
                    open={openTip}
                    onClose={handleCloseTip}
                    disableHoverListener
                    placement="top"
                    title="Copied!"
                  >
                    <CopyToClipBoard text={user && user.uid}>
                      <IconButton onClick={handleClickButton}>
                        <AssignmentIcon />
                      </IconButton>
                    </CopyToClipBoard>
                  </Tooltip>
                </InputAdornment>
              </Grid>
            </Grid>
          </form>
          <Button
            onClick={() => {
              auth.signOut();
            }}
            fullWidth
            variant="contained"
            color="secondary"
            style={{ marginTop: 10 }}
          >
            ログアウト
          </Button>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Profile;
