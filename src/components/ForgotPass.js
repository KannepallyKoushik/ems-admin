import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Link, useHistory } from "react-router-dom";

import "../App.css";
import axios from "../axios";
import ForgotPassValidator from "./Validators/ForgotPassValidator";

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
      <Link color="inherit" to="/login">
        Elective Management System
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#f0f0f5",
    paddingTop: "10px",
    paddingBottom: "50px",
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

const ForgotPass = () => {
  const [error, setError] = useState("");
  const initialValues = {
    email: "",
  };
  const history = useHistory();
  const formik = useFormik({
    initialValues,
    validationSchema: ForgotPassValidator,
    onSubmit: (body) => {
        axios
          .post("/auth/forgotpassword", body, {
            headers: {
              "Content-type": "application/json",
            },
          })
          .then((res) => {
            const status = res.status;

            if (status === 200 || 201) {
              alert("Reset Password link sent to your email.");

              history.push("/login");
            }
          })
          .catch((er) => {
            const status = er.response.status;
            const errData = er.response.data;
            document.getElementById("forgotpassword-failure").style.visibility =
              "visible";
            console.log("response error code", status);
            setError(errData);
          });
    },
  });

  const classes = useStyles();

  useEffect(() => {
    document.getElementById("forgotpassword-failure").style.visibility =
      "hidden";
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <br></br>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <br></br>
        <br></br>
        <Typography component="h1" variant="h5">
          Get a Password Reset Link
        </Typography>
        <div id="forgotpassword-failure">{error}</div>
        <br></br>
        <br></br>
        <form onSubmit={formik.handleSubmit}>
          <Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                style={{ width: 310 }}
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
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                Remember your Password? Sign In
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Report />
        <Copyright />
      </Box>
    </Container>
  );
};

export default ForgotPass;
