import * as yup from "yup";

export const UserSignUpSchema = yup.object().shape({
  name: yup.string().required("Required"),
  email: yup
    .string()
    .email("Please enter correct email")
    .transform((value) => value.toLowerCase())
    .required("Required"),
  password: yup
    .string("Password should include characters a-z")
    .min(8, "Password must be at least 8 characters")
    .test(
        'not-including-password',
        'Password not accepted',
        value => !value || !value.toLowerCase().includes('password')
      )
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match")
    .required("Required"),
  gender: yup.string().oneOf(["M", "F"]).required("Required"),
  phoneNumber: yup.string().required("Required"),
});
