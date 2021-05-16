import React from "react";
import { Link } from "react-router-dom";

import Typography from "@material-ui/core/Typography";

export function Report() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Report an Issue with the Website "}
      <Link color="inherit" to="/report">
        Here
      </Link>{" "}
    </Typography>
  );
}

export function Copyright() {
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
