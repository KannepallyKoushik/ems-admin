import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../axios";
import "../App.css";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

function AdminLogin() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      <Link color="inherit" to="/admin/login">
        Sign In
      </Link>{" "}
      {" as Admininstrator"}
    </Typography>
  );
}

function Report() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Report an Issue with the Website "}
      <Link color="inherit" to="/report">
        Here
      </Link>{" "}
    </Typography>
  );
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" to="/">
        Elective Management System
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#f0f0f5",
    paddingTop: "10px",
    paddingBottom: "40px",
    paddingLeft: "20px",
    paddingRight: "20px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = ({ setAuth }) => {
  const [error, setError] = useState("");
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
      const body = { email, password, role: "student" };
      axios
        .post("/auth/login", body, {
          headers: {
            "Content-type": "application/json",
          },
        })
        .then((res) => {
          const parseRes = res.data;
          if (parseRes.token) {
            localStorage.setItem("token", parseRes.token);
            setAuth(true);
            toast.success("LoggedIn Successfully");
          }
        })
        .catch((er) => {
          setAuth(false);
          const status = er.response.status;
          const errData = er.response.data;
          document.getElementById("signup-failure1").style.visibility =
            "visible";
          console.log("response error code", status);
          setError(errData);
        });
  };

  useEffect(() => {
    document.getElementById("signup-success").style.visibility = "hidden";
    document.getElementById("signup-failure1").style.visibility = "hidden";
  }, []);

  const classes = useStyles();

  return (
    <div className={classes.body}>
      <Box mt={8}>
        <AdminLogin />
      </Box>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In as Student
          </Typography>
          <div id="signup-success">User Registered Successfully!</div>
          <div id="signup-failure1">{error}</div>
          <form className={classes.form} noValidate onSubmit={onSubmitForm}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => onChange(e)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => onChange(e)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/forgotpassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/register">{"Don't have an account? Sign Up"}</Link>
              </Grid>
            </Grid>
          </form>
        </div>

        <Box mt={8}>
          <Report />
          <Copyright />
        </Box>
      </Container>
    </div>
  );
};

export default SignIn;
