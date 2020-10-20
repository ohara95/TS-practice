import React, { FC } from "react";
import { Users } from "../../types";

//material
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    avatar: {
      display: "flex",
      "& > *": {
        margin: theme.spacing(1),
        width: theme.spacing(7),
        height: theme.spacing(7),
      },
    },
  })
);

type Props = {
  open: boolean;
  close: (param: boolean) => void;
  title: string;
  users: Users[];
};

const UserListModal: FC<Props> = ({ open, title, close, users }) => {
  const classes = useStyles();
  console.log(users);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={close}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            style={{ height: 100 }}
          >
            <Typography style={{ fontWeight: "bold" }}>{title}</Typography>
            <div className={classes.avatar}>
              {users?.map((db) => (
                <Tooltip title={db.name}>
                  <Avatar alt={db.name} src={db.avatarUrl} />
                </Tooltip>
              ))}
            </div>
          </Grid>
        </div>
      </Fade>
    </Modal>
  );
};

export default UserListModal;
