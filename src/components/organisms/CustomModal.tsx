import React, { FC } from "react";
import { useRecoilState } from "recoil";
import { groupsData } from "../../atoms_recoil";
import { db } from "../../config/firebase";

//material
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { red } from "@material-ui/core/colors";
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
    large: {
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
    iconColor: {
      color: red["A200"],
    },
    overTitle: {
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
      width: "50%",
      textAlign: "center",
    },
  })
);

type Props = {
  open: boolean;
  close: (param: boolean) => void;
  title: string;
  src?: string;
  render?: JSX.Element;
  favorite: boolean;
  currentId: string;
};

const GroupModal: FC<Props> = ({
  open,
  close,
  title,
  src,
  render,
  favorite,
  currentId,
}) => {
  const classes = useStyles();
  const [groups, setGroups] = useRecoilState(groupsData);

  const isFavorite = () => {
    setGroups(
      groups.map((group) => {
        if (group?.id === currentId) {
          return {
            ...group,
            favorite: !group.favorite,
          };
        } else {
          return group;
        }
      })
    );
    db.collection("groups").doc(currentId).update({ favorite: !favorite });
  };

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
            <IconButton aria-label="add to favorites" onClick={isFavorite}>
              {favorite ? (
                <Tooltip title="favorited!">
                  <FavoriteIcon className={classes.iconColor} />
                </Tooltip>
              ) : (
                <Tooltip title="favorite?">
                  <FavoriteBorderIcon />
                </Tooltip>
              )}
            </IconButton>
            <Typography className={classes.overTitle}>{title}</Typography>
            <Avatar aria-label="recipe" className={classes.large} src={src} />
          </Grid>
          {render}
        </div>
      </Fade>
    </Modal>
  );
};

export default GroupModal;

// import Tooltip from "@material-ui/core/Tooltip";

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
// @ -106,9 +107,13 @@ const GroupModal: FC<Props> = ({
//           >
//             <IconButton aria-label="add to favorites" onClick={isFavorite}>
//               {favorite ? (
//                 <FavoriteIcon className={classes.iconColor} />
//                 <Tooltip title="favorited!">
//                   <FavoriteIcon className={classes.iconColor} />
//                 </Tooltip>
//               ) : (
//                 <FavoriteBorderIcon />
//                 <Tooltip title="favorite?">
//                   <FavoriteBorderIcon />
//                 </Tooltip>
//               )}
//             </IconButton>
//             <Typography>{title}</Typography>
