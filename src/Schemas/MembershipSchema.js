import * as yup from "yup";

export const MembershipSchema = yup.object().shape({
 titleInEnglish: yup.string().min(3 , "En-Title must be more than 3 characters").required("Required"),
 titleInArabic: yup.string().min(3 , "Ar-Title must be more than 3 characters").required("Required"),
 descriptionInEnglish: yup.string().min(10 ,"En-Description must be more than 10 characters").required("Required"),
 descriptionInArabic: yup.string().min(10 ,"Ar-Description must be more than 10 characters").required("Required"),
 duration : yup.string().required("Duration required"),
 price: yup.number().min(1,"Price should be positive number").required("Required"),
 points: yup.number().required("Required"),
 type: yup.string().required("Membership Type is required")
}
);
