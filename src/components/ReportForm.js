import React, { useEffect } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";

import "../App.css";
import axios from "../axios";
import ReportValidator from "./Validators/ReportValidator";
import Header from "./Header";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

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

export default function ReportForm() {
  const initialValues = {
    name: "",
    email: "",
    message: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema: ReportValidator,
    onSubmit: (body) => {
        axios
          .post("/auth/report", body, {
            headers: {
              "Content-type": "application/json",
            },
          })
          .then((res) => {
            const data = res.data;
            const status = res.status;
            console.log(status);
            console.log(data);
            if (status === 200 || 201) {
              document.getElementById("form-message-success").style.visibility =
                "visible";
            }
          })
          .catch((err) => {
            const status = err.response.data;
            console.log(status);
            document.getElementById("form-message-failure").style.visibility =
              "visible";
          });
    },
  });

  useEffect(() => {
    document.getElementById("form-message-success").style.visibility = "hidden";
    document.getElementById("form-message-failure").style.visibility = "hidden";
  }, []);

  return (
    <div>
      <Header />
      <div class="content">
        <div class="container">
          <div class="row align-items-stretch no-gutters contact-wrap">
            <div class="col-md-12">
              <div class="form h-100">
                <h3>Report any Issue with the Site</h3>
                <form
                  class="mb-5"
                  id="contactForm"
                  name="contactForm"
                  onSubmit={formik.handleSubmit}
                >
                  <div class="row">
                    <div class="col-md-6 form-group mb-5">
                      <label for="" class="col-form-label">
                        Name *
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        name="name"
                        id="name"
                        placeholder="Your name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.name && formik.touched.name && (
                        <p class="errors">{formik.errors.name}</p>
                      )}
                    </div>
                    <div class="col-md-6 form-group mb-5">
                      <label for="" class="col-form-label">
                        Email *
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        name="email"
                        id="email"
                        placeholder="Your email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.email && formik.touched.email && (
                        <p class="errors">{formik.errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-12 form-group mb-5">
                      <label for="message" class="col-form-label">
                        Explain Issue *
                      </label>
                      <textarea
                        class="form-control"
                        name="message"
                        id="message"
                        cols="30"
                        rows="10"
                        placeholder="Describe your issue"
                        value={formik.values.message}
                        onChange={formik.handleChange}
                      ></textarea>
                      {formik.errors.message && formik.touched.message && (
                        <p class="errors">{formik.errors.message}</p>
                      )}
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12 form-group">
                      <input
                        type="submit"
                        value="Send"
                        class="btn btn-primary rounded-0 py-2 px-4"
                      />
                      <span class="submitting"></span>
                    </div>
                  </div>
                </form>

                <div id="form-message-failure">
                  Sorry, could not send your message. Try again!
                </div>
                <div id="form-message-success">
                  Your message was sent, thank you!
                </div>
                <div>
                  Already have an account? <Link to="/login">Sign In</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </div>
    </div>
  );
}
