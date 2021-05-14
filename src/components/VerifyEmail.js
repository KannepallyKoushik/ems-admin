import axios from "../axios";
import React from "react";
import { useHistory } from "react-router-dom";

export default function VerifyEmail({ match }) {
  const history = useHistory();
  const submit = () => {
    const user_id = match.params.id;
    const reqBody = {
      user_id: user_id,
    };
    console.log(reqBody);
    axios
      .post("/auth/verifyEmail", reqBody, {
        headers: {
          "Content-type": "application/json",
        },
      })
      .then((res) => {
        const parseRes = res.data;
        console.log("parseRes", parseRes);
        alert(parseRes);
        history.push("/login");
      })
      .catch((err) => {
        const errData = err.response.Data;
        console.log("errData", errData);
        alert(errData);
        history.push("/login");
      });
  };
  return (
    <div>
      <h1>Thanks for verifying</h1>
      {submit()}
    </div>
  );
}
