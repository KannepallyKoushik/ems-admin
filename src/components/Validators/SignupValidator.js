import * as yup from "yup";

const SignupValidator = yup.object({
  fname: yup.string().required("First Name is Required"),
  lname: yup.string(),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup.string()
    .min(8, "Minimum 8 characters")
    .required("Required!"),
  confirmpass: yup.string()
    .oneOf([yup.ref("password")], "Password's not match")
    .required("Required!")
});

export default SignupValidator;
