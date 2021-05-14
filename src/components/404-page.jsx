import React from 'react'
import { Container } from "@material-ui/core";
import "../App.css";
import Grid from "@material-ui/core/Grid";
import Image from "material-ui-image";

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
            <h2>The page you requested could not be found!!!</h2>
          </Grid>
          <Grid item xs={5} style={{ paddingTop: "50px", paddingLeft: "30px" }}>
            <Image src="https://i.imgur.com/qIufhof.png" />
          </Grid>
        </Grid>
      </Container> 
      </div >
    )
}

export default PageNotFound