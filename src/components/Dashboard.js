import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "../App.css";
import axios from "../axios";

import Grid from "@material-ui/core/Grid";
import Image from "material-ui-image";
import { Container } from "@material-ui/core";

const PageNotFound = () => {
  return (
    <div id="wrapper">
      <Container maxWidth="xl">
        <Grid container>
          <Grid
            item
            xs={7}
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: "85vh" }}
          >
            <h1>Oops!!</h1>
            <h2>You are not an Admin</h2>
          </Grid>
          <Grid item xs={5} style={{ paddingTop: "50px", paddingLeft: "30px" }}>
            <Image src="https://i.imgur.com/qIufhof.png" />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

const Dashboard = ({ setAuth }) => {
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");

  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };
  function AdminDash() {
    return (
      <div>
        <h1>Admin Dashboard</h1>
        <h5>Welcome {username}</h5>
        <button onClick={(e) => logout(e)} className="btn btn-primary">
          Logout
        </button>
      </div>
    );
  }

  const getData = async () => {
    axios
      .post(
        "/dashboard/",
        { dummybody: "dummy" },
        {
          headers: { token: localStorage.token },
          "Content-type": "application/json",
        }
      )
      .then((res) => {
        const parseRes = res.data;
        setRole(parseRes.user_role);
        setUsername(parseRes.username);
      })
      .catch((er) => {
        console.log(er.response.data);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return role === "admin" ? <AdminDash /> : <PageNotFound />;
};

export default Dashboard;
