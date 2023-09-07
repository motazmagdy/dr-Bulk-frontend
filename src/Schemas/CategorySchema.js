import * as yup from "yup";

export const CategorySchema = yup.object().shape({
  nameInEnglish: yup.string().min(3 , "En-Title must be more than 3 characters").required("Required"),
  nameInArabic: yup.string().min(3 , "Ar-Title must be more than 3 characters").required("Required")
});
