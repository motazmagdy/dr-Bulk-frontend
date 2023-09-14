import * as yup from "yup";

export const InstructorSchema = yup.object().shape({
  nameInEnglish: yup
    .string()
    .min(2, "En-Title must be more than 3 characters")
    .required("Required"),
  nameInArabic: yup
    .string()
    .min(2, "Ar-Title must be more than 3 characters")
    .required("Required"),
  bioInEnglish: yup
    .string()
    .min(10, "En-Bio must be more than 3 characters")
    .required("Required"),
  bioInArabic: yup
    .string()
    .min(10, "Ar-Bio must be more than 3 characters")
    .required("Required"),
  phoneNumber: yup
    .number()
    .positive("Phone number must be a positive value")
    .required("Required"),
});
