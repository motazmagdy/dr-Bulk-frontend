import React from 'react';
import './AboutUs.css'
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import { Box, useTheme, TextField , Typography } from "@mui/material";
import { Formik } from "formik";
import Button from "@mui/material/Button";
import axios from "axios";
import { toast } from "react-toastify";
import { tokens } from "../../../theme";
import { AboutUsSchema } from '../../../Schemas/AboutUsSchema';
const serverApi = process.env.REACT_APP_DR_BULK_API;

const AboutUs = ({aboutUs,setAboutUs}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const editAboutUs = (editedAboutUs)=>{
        const newAbout = {
            drBulkSpotlit:{
                en:editedAboutUs.spotlightInEnglish,
                ar:editedAboutUs.spotlightInArabic
            },
            gymAbout:{
                en:editedAboutUs.aboutUsInEnglish,
                ar:editedAboutUs.aboutUsInArabic
            }
        }
        axios
        .post(`${serverApi}/api/about`, newAbout, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        })
        .then((response) => {
          if (response.status === 201) {
            toast.success("About Us Updated Successfully ! ");
          }
        })
        .catch((err) => {
          if (err.response.data.message) {
            toast.error(err.response.data.message);
          } else {
            err.response.data.errors.forEach((err) => {
              toast.error(err.msg);
            });
          }
        });   
    }

    return (
        <Box m="20px">
            <DashboardHeader title="About Us" subtitle="Managing About Us" />
              <Formik
                initialValues={{
                  spotlightInEnglish: aboutUs.drBulkSpotlit.en,
                  spotlightInArabic: aboutUs.drBulkSpotlit.ar,
                  aboutUsInEnglish: aboutUs.gymAbout.en,
                  aboutUsInArabic: aboutUs.gymAbout.ar,
                }}
                onSubmit={(values, actions) => {
                  editAboutUs(values);
                }}
                validationSchema={AboutUsSchema}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  setFieldValue,
                }) => (
                  <form display="flex" onSubmit={handleSubmit}>   
                    <Typography
                        variant="h5"
                        color={colors.grey[100]}
                        sx={{ m: "0 0 5px 0" }}
                        >
                        Dr.Bulk Spotlight in English
                        </Typography>
                        <TextField
                            multiline
                            className='about-field'
                            rows={4}
                            type="string"
                            label="spotlightEnglish"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.spotlightInEnglish}
                            name="spotlightInEnglish"
                            />
                             {errors.spotlightInEnglish && touched.spotlightInEnglish ? (
                            <span className="input-err-msg">
                              {errors.spotlightInEnglish}
                            </span>
                          ) : null}
                        <Typography
                        variant="h5"
                        color={colors.grey[100]}
                        sx={{ m: "0 0 5px 0" }}
                        >
                        Dr.Bulk Spotlight in Arabic
                        </Typography>
                        <TextField
                            multiline
                            className='about-field'
                            rows={4}
                            type="string"
                            label="spotlightArabic"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.spotlightInArabic}
                            name="spotlightInArabic"
                            />
                           {errors.spotlightInArabic && touched.spotlightInArabic ? (
                            <span className="input-err-msg">
                              {errors.spotlightInArabic}
                            </span>
                          ) : null}
                        <Typography
                        variant="h5"
                        color={colors.grey[100]}
                        sx={{ m: "0 0 5px 0" }}
                        >
                        About Us in English 
                        </Typography>
                        <TextField
                            multiline
                            className='about-field'
                            rows={4}
                            type="string"
                            label="aboutUsEnglish"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.aboutUsInEnglish}
                            name="aboutUsInEnglish"
                            />
                             {errors.aboutUsInEnglish && touched.aboutUsInEnglish ? (
                            <span className="input-err-msg">
                              {errors.aboutUsInEnglish}
                            </span>
                          ) : null}
                        <Typography
                        variant="h5"
                        color={colors.grey[100]}
                        sx={{ m: "0 0 5px 0" }}
                        >
                        About Us in Arabic
                        </Typography>
                        <TextField
                            multiline
                            className='about-field'
                            rows={4}
                            type="string"
                            label="aboutUsArabic"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.aboutUsInArabic}
                            name="aboutUsInArabic"
                            />
                             {errors.aboutUsInArabic && touched.aboutUsInArabic ? (
                            <span className="input-err-msg">
                              {errors.aboutUsInArabic}
                            </span>
                          ) : null}
                    <Box className="newInstructorBtns">
                        <Button
                          sx={{
                            backgroundColor: "rgb(244, 67, 54) !important",
                            color: "white",
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          onClick={handleSubmit}
                          sx={{
                            backgroundColor: "rgb(0, 137, 46 ) !important",
                            color: "white",
                          }}
                        >
                          Update
                        </Button>
                      </Box>
                
                </form>
                 )}
                 </Formik>
        </Box>
    );
};

export default AboutUs;