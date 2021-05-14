import * as yup from "yup";

const ChangePassValidator = yup.object({
  password: yup.string().min(8, "Minimum 8 characters").required("Required!"),
  confirmpass: yup
    .string()
    .oneOf([yup.ref("password")], "Password's not match")
    .required("Required!"),
});

export default ChangePassValidator;
