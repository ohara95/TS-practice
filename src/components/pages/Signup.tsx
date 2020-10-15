import React from "react";
import firebase, { auth, db } from "../../config/firebase";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";

//material
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "70%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

type UseForm = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Signup = () => {
  const classes = useStyles();
  const { errors, control, handleSubmit, getValues } = useForm<UseForm>();
  const history = useHistory();

  const onFormSubmit = (data: UseForm) => {
    auth
      .createUserWithEmailAndPassword(data.email, data.confirmPassword)
      .then(() => {
        const user = auth.currentUser;

        user
          ?.updateProfile({
            displayName: data.username,
          })
          .then(() => {
            db.collection("users").doc(user?.uid).set({
              name: user?.displayName,
              id: user?.uid,
            });

            db.collection("groups")
              .doc()
              .set({
                groupName: "ホーム",
                owner: user.uid,
                users: firebase.firestore.FieldValue.arrayUnion(user.uid),
                createdAt: new Date(),
              });
          });
        history.push("/");
      })
      .catch((e) => {
        if (e.code === "auth/email-already-in-use") {
          return alert("登録済のアドレスです");
        }
        console.log(e, "signun");
      });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid container justify="center" spacing={2}>
        <Grid item xs={12} sm={6}>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              新規登録
            </Typography>
            <form
              onSubmit={handleSubmit(onFormSubmit)}
              className={classes.form}
              noValidate
            >
              <Controller
                name="username"
                defaultValue=""
                control={control}
                rules={{ required: true }}
                as={
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="ユーザー名"
                    name="username"
                    autoComplete="username"
                    autoFocus
                  />
                }
              />
              {errors.username && <Typography>入力してください</Typography>}
              <Controller
                name="email"
                defaultValue=""
                control={control}
                rules={{ required: true }}
                as={
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="メールアドレス"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                }
              />
              {errors.email && <Typography>入力してください</Typography>}
              <Controller
                name="password"
                defaultValue=""
                control={control}
                rules={{
                  validate: (value) => {
                    if (value === getValues().password) {
                      return true;
                    } else {
                      return "パスワードが一致しません";
                    }
                  },
                }}
                as={
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="パスワード"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                }
              />
              {errors.confirmPassword && (
                <Typography>{errors.confirmPassword?.message}</Typography>
              )}

              <Controller
                name="confirmPassword"
                defaultValue=""
                control={control}
                rules={{ required: true }}
                as={
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="パスワード(確認用)"
                    type="password"
                    id="confirmPassword"
                    autoComplete="current-password"
                  />
                }
              />
              {errors.confirmPassword && (
                <Typography>入力してください</Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                登録
              </Button>
            </form>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Signup;
