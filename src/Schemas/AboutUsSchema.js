import * as yup from "yup";

export const AboutUsSchema = yup.object().shape({
  spotlightInEnglish:yup.string().required("Required").min(2, "Must be at least 2 characters"),
  spotlightInArabic:yup.string().required("Required").min(2, "Must be at least 2 characters"),
  aboutUsInEnglish:yup.string().required("Required").min(10, "Must be at least 10 characters"),
  aboutUsInArabic:yup.string().required("Required").min(10, "Must be at least 10 characters")
  });
