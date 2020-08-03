import React from "react";
import { Grid, TextField, Button, Paper, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import axios from "../lib/axios";
import { useSnackbar } from "notistack";

const useStyle = makeStyles((theme) => ({
  container: {
    height: "100vh",
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.primary.light,
  },
  input: {
    margin: theme.spacing(2),
  },
}));

function LogIn() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const login = async () => {
    try {
      const ret = await axios.post("/login", {
        username,
        password,
      });
      localStorage.setItem("token", ret.data.access_token);
      history.replace("/");
    } catch (err) {
      enqueueSnackbar(err.response.data.message, { variant: "error" });
    }
  };

  const classes = useStyle();
  return (
    <Grid
      container
      direction="row"
      xs={12}
      alignItems="center"
      justify="center"
      className={classes.container}
    >
      <Paper elevation={4} className={classes.paper}>
        <TextField
          label="Email"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          className={classes.input}
        />
        <TextField
          label="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className={classes.input}
        />
        <Button variant="contained" color="primary" onClick={login}>
          Log In
        </Button>
      </Paper>
    </Grid>
  );
}

export default LogIn;
