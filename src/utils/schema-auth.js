import * as Yup from "yup";

export const schemaDoctorRegister = Yup.object({
  username: Yup.string().max(30).required("Username is required"),
  password: Yup.string()
    .min(6, "Password must has more than 6 characters")
    .required("Password is required"),
  specialization: Yup.string().required("specialization is required"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password")],
    "Confirm password is not match"
  ),
});

export const schemaUserRegister = Yup.object({
  username: Yup.string().max(30).required("Username is required"),
  password: Yup.string()
    .min(6, "Password must has more than 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password")],
    "Confirm password is not match"
  ),
});
