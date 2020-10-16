import React, { FC, useEffect, useContext } from "react";
import firebase, { db } from "../../config/firebase";
import { AuthContext } from "../../AuthService";
import { format } from "date-fns";
import { useRecoilValue } from "recoil";
import { usersData } from "../../atoms_recoil";

// material
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
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
}));

type Props = {
  content: string;
  id: string;
  createdAt: firebase.firestore.Timestamp;
  // userRef: any;
};

const Item: FC<Props> = ({ content, id, createdAt }) => {
  const classes = useStyles();
  const users = useRecoilValue(usersData);
  const { user } = useContext(AuthContext);

  // const userData = userRef.get().then((response: any) => response.ref);
  // console.log(userData);

  const displayName = () => {
    if (users && user) {
      const findUser = users.find((storeUser) => storeUser.id === user.uid);
      if (findUser) {
        return findUser.name;
      }
    }
  };
  const deleteItem = (id: string) => {
    console.log(id);

    db.collection("chat")
      .doc(id)
      .get()
      .then((res) => {
        res.ref.delete();
      })
      .catch((err) => console.log(err));

    // if (imageUrl) {
    //   storage.refFromURL(imageUrl).delete();
    // }
  };
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={displayName()}
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
      <Divider variant="inset" component="li" />
    </>
  );
};

export default Item;
