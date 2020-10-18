import React, { FC } from "react";
import { auth } from "../../config/firebase";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
// material
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { deepOrange } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    background: "white",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: deepOrange[300],
  },
  form: {
    width: "70%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: deepOrange[200],
  },
}));

type UseForm = {
  email: string;
};

const ResetPassword: FC = () => {
  const classes = useStyles();

  const { errors, handleSubmit, control } = useForm<UseForm>();

  const onFromSubmit = (data: UseForm) => {
    auth
      .sendPasswordResetEmail(data.email)
      .then(() => alert("メールを送信致しましたのでご確認をお願い致します"))
      .catch((err) => {
        if (err.code === "auth/invalid-email") {
          return alert("アドレスが無効です");
        }
        if (err.code === "auth/user-not-found") {
          return alert("ご記入頂いたアドレスの登録がございません");
        }
        console.log(err);
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
              パスワード再設定
            </Typography>
            <br />
            <Typography variant="caption" display="block">
              ※登録済のメールアドレスをご記入下さい。
              <br />
              <Typography variant="caption" display="block">
                {" "}
                &nbsp;&nbsp;確認メールを送信致します
              </Typography>
              <Typography variant="caption" display="block">
                ※メールをご確認頂きパスワードの再設定をお願い致します。
              </Typography>
            </Typography>
            <form
              onSubmit={handleSubmit(onFromSubmit)}
              className={classes.form}
              noValidate
            >
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
              >
                送信
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/signin">←ログイン画面へ</Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ResetPassword;
