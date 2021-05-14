import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Link, useHistory } from "react-router-dom";

import "../App.css";
import axios from "../axios";
import ChangePassValidator from "./Validators/ChangePassValidator";

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

const ChangePass = ({ match }) => {
  const [error, setError] = useState("");
  const initialValues = {
    password: "",
    confirmpass: "",
  };
  const history = useHistory();
  const formik = useFormik({
    initialValues,
    validationSchema: ChangePassValidator,
    onSubmit: (body) => {
      const reqBody = {
        encryptedID: match.params.id,
        password: body.password,
      };
      axios
        .post("/auth/changePassword", reqBody, {
          headers: {
            "Content-type": "application/json",
          },
        })
        .then((res) => {
          const status = res.status;
          if (status === 200 || 201) {
            alert("You have successfully changed your password");
            history.push("/login");
          }
        })
        .catch((er) => {
          const status = er.response.status;
          const errData = er.response.data;
          document.getElementById("changepassword-failure").style.visibility =
            "visible";
          console.log("response error code", status);
          setError(errData);
        });
    },
  });

  const classes = useStyles();

  useEffect(() => {
    document.getElementById("changepassword-failure").style.visibility =
      "hidden";
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Change Password
        </Typography>
        <div id="changepassword-failure">{error}</div>
        <br></br>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
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
            <Grid item xs={12}>
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
            Change Password
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
        <Copyright />
      </Box>
    </Container>
  );
};

export default ChangePass;
