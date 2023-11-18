import * as yup from "yup";

export const UpdateProductSchema = yup.object().shape({
  titleInEnglish: yup.string().min(3,"En-Title must be more than 3 characters").required("Required"),
  titleInArabic: yup.string().min(3,"Ar-Title must be more than 3 characters").required("Required"),
  category: yup.object().required("Product must be belong to category"),
  descriptionInEnglish: yup.string().min(10 ,"En-Description must be more than 3 characters").required("Required"),
  descriptionInArabic: yup.string().min(10 ,"Ar-Description must be more than 3 characters").required("Required"),
  price: yup.number().min(1,"Price should be positive number").required("Required"),
  points: yup.number()
  });
