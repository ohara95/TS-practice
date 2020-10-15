import React, { FC, useContext } from "react";
import firebase from "../../config/firebase";
import { AuthContext } from "../../AuthService";
import { format } from "date-fns";

// material
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

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
};

const Item: FC<Props> = ({ content, id, createdAt }) => {
  const classes = useStyles();

  const { user, users } = useContext(AuthContext);

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
        </Typography>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

export default Item;
