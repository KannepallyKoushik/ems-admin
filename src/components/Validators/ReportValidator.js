import * as yup from "yup";

const ReportValidator = yup.object({
  name: yup.string().required("Name is Required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  message: yup.string().required("Body has no text"),
});

export default ReportValidator;
