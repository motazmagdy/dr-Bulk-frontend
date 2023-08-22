import * as yup from "yup";

export const AdminChangePasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter correct email")
    .lowercase("Email should be in lowercase")
    .required("Required"),
  password: yup
    .string("Password should include characters a-z")
    .min(8, "Password must be at least 8 characters")
    .required("Required"),
  newPassword: yup
    .string("Password should include characters a-z")
    .min(8, "Password must be at least 8 characters")
    .test(
      "not-including-password",
      "Password not accepted",
      (value) => !value || !value.toLowerCase().includes("password")
    )
    .notOneOf([yup.ref("password"), null], "Password must not match"),
});
