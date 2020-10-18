import React, { FC } from "react";

//material
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";

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
    large: {
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
  })
);

type Props = {
  open: boolean;
  close: (param: boolean) => void;
  title: string;
  src?: string;
  render?: JSX.Element;
};

const GroupModal: FC<Props> = ({ open, close, title, src, render }) => {
  const classes = useStyles();

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
            <Typography>{title}</Typography>
            <Avatar aria-label="recipe" className={classes.large} src={src} />
          </Grid>
          {render}
        </div>
      </Fade>
    </Modal>
  );
};

export default GroupModal;
