import React from "react";
import "./HomePage.css";
import { Container } from "@material-ui/core";
import Header from "./Header";
import "../App.css";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Image from "material-ui-image";
import { Copyright } from "./Footer";

export default function Home() {
  return (
    <div className="App">
      <Header />
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
            <h1>Electives Management System</h1>
            <h2>Amrita Vishwa Vidyapeetham</h2>
            <h3>Coimbatore</h3>
          </Grid>
          <Grid item xs={5} style={{ paddingTop: "50px", paddingLeft: "30px" }}>
            <Image src="https://pbs.twimg.com/profile_images/1120017544369164288/E83KBrg4.png" />
          </Grid>
        </Grid>
        <Box mt={8}>
          <Copyright />
          <br></br>
        </Box>
      </Container>
    </div>
  );
}
