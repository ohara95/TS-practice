import React, { FC } from "react";
import Item from "./Item";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
}));

type DbMessage = {
  content: string;
  createdAt: firebase.firestore.Timestamp;
  groupId: any[];
  // image:string;
  user: any[];
  id: string;
};
type Props = {
  messageList: DbMessage[];
  // setMessageList: (param: DbMessage[]) => void;
  // message: string;
  // setMessage: (param: string) => void;
};

const Lists: FC<Props> = ({ messageList }) => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {messageList.map((list) => {
        return (
          <List>
            <Item
              content={list.content}
              id={list.id}
              createdAt={list.createdAt}
            />
          </List>
        );
      })}
    </List>
  );
};

export default Lists;
