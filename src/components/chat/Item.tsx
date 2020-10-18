import React, { FC, useEffect, useContext, useState } from "react";
import firebase, { db, storage } from "../../config/firebase";
import { AuthContext } from "../../AuthService";
import { format } from "date-fns";
import { useRecoilValue } from "recoil";
import { usersData, currentGroupId } from "../../atoms_recoil";
import { Users } from "../../types";
import { ImageArr } from "./type";

// material
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
  singleImageSize: {
    width: "40%",
    height: "40%",
    margin: theme.spacing(9),
  },
  sameImageSize: {
    width: "20%",
    height: "20%",
    margin: theme.spacing(2),
  },
}));

type Props = {
  content: string;
  id: string;
  createdAt: firebase.firestore.Timestamp;
  image: ImageArr[];
  // memo |Users怒られる
  userRef: firebase.firestore.DocumentReference;
  groupId: string;
};

const Item: FC<Props> = ({
  content,
  id,
  createdAt,
  userRef,
  image,
  groupId,
}) => {
  const classes = useStyles();
  const users = useRecoilValue(usersData);
  const currentId = useRecoilValue(currentGroupId);
  const { user } = useContext(AuthContext);
  const [userDetail, setUserDetail] = useState([]);

  useEffect(() => {
    userRef.get().then((res) => setUserDetail([...userDetail, res.data()]));
  }, []);

  const deleteItem = (id: string) => {
    db.collection("chat").doc(id).delete();

    if (image) image.map((db) => storage.refFromURL(db.url).delete());
  };

  //memo 何で全部出てくる？取り出せないし
  // console.log(userDetail.find(({ avatarUrl }) => avatarUrl));

  // console.log(image.find((db) => db.url));

  return (
    <>
      {groupId === currentId && (
        <>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar
                src={userDetail.find(({ avatarUrl }) => avatarUrl) as string}
              />
            </ListItemAvatar>
            <ListItemText
              primary={userDetail.map(({ name }) => name)}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {content}
                  </Typography>
                </React.Fragment>
              }
            />
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textSecondary"
            >
              {format(new Date(createdAt.seconds * 1000), "yyyy/MM/dd hh:mm")}
              <IconButton
                onClick={() => {
                  deleteItem(id);
                }}
                edge="end"
                aria-label="delete"
                size="small"
              >
                <DeleteIcon />
              </IconButton>
            </Typography>
          </ListItem>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <Grid item>
              {image &&
                image.map((db) => {
                  return (
                    <img
                      src={db.url}
                      className={
                        image.length <= 1
                          ? classes.singleImageSize
                          : classes.sameImageSize
                      }
                    />
                  );
                })}
            </Grid>
          </Grid>
          <Divider variant="inset" component="li" />
        </>
      )}
    </>
  );
};

export default Item;
