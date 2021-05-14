import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Link, useHistory } from "react-router-dom";

import "../App.css";
import axios from "../axios";
import SignupValidator from "./Validators/SignupValidator";

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

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(10),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = () => {
  const [error, setError] = useState("");
  const history = useHistory();
  const initialValues = {
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirmpass: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema: SignupValidator,
    onSubmit: (body) => {
        const { fname, lname, email, password } = body;
        const reqbody = {
          name: fname + " " + lname,
          email: email,
          password: password,
          role: "student",
        };

        axios
          .post("/auth/register", reqbody, {
            headers: {
              "Content-type": "application/json",
            },
          })
          .then((res) => {
            const parseRes = res.data;
            alert(parseRes);
            history.push("/login");
          })
          .catch((err) => {
            const status = err.response.status;
            const errData = err.response.data;
            document.getElementById("signup-failure1").style.visibility =
              "visible";
            console.log("response error code", status);
            setError(errData);
          });
    },
  });

  useEffect(() => {
    document.getElementById("signup-success").style.visibility = "hidden";
    document.getElementById("signup-failure1").style.visibility = "hidden";
  }, []);

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <div id="signup-success">User Registered Successfully!</div>
        <div id="signup-failure1">{error}</div>
        <br></br>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="fname"
                variant="outlined"
                required
                fullWidth
                id="fname"
                label="First Name"
                autoFocus
                value={formik.values.fname}
                onChange={formik.handleChange}
              />
              {formik.errors.fname && formik.touched.fname && (
                <p class="errors">{formik.errors.fname}</p>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lname"
                label="Last Name"
                name="lname"
                autoComplete="lname"
                value={formik.values.lname}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.errors.email && formik.touched.email && (
                <p class="errors">{formik.errors.email}</p>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.errors.password && formik.touched.password && (
                <p class="errors">{formik.errors.password}</p>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmpass"
                label="Confirm Password"
                type="password"
                id="confirmpass"
                autoComplete="current-password"
                value={formik.values.confirmpass}
                onChange={formik.handleChange}
              />
              {formik.errors.confirmpass && formik.touched.confirmpass && (
                <p class="errors">{formik.errors.confirmpass}</p>
              )}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>

          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Report />
        <Copyright />
      </Box>
    </Container>
  );
};

export default SignUp;
