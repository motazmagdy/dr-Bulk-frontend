import * as yup from "yup";

const acceptedImagesFormats = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png']

export const NewProductSchema = yup.object().shape({
  titleInEnglish: yup.string().min(3,"En-Title must be more than 3 characters").required("Required"),
  titleInArabic: yup.string().min(3,"Ar-Title must be more than 3 characters").required("Required"),
  category: yup.string().required("Product must be belong to category"),
  descriptionInEnglish: yup.string().min(10 ,"En-Description must be more than 3 characters").required("Required"),
  descriptionInArabic: yup.string().min(10 ,"Ar-Description must be more than 3 characters").required("Required"),
  price: yup.number().min(1,"Price should be positive number").required("Required"),
  points: yup.number(),
  images: yup.mixed().test('imageType','Only Images with types ".jpg/.jpeg/ .gif /.png" accepted',value=>{
    if(value.length === 1){
      return  acceptedImagesFormats.includes(value[0].type)
    } else if (value.length > 1) {
      return value.every(file=>acceptedImagesFormats.includes(file.type))
    } 
    return true
  }).required("Product images is required")
});
