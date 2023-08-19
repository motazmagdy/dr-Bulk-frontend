import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Field, Formik } from "formik";
import  axios from "axios"
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next";
import { AdminChangePasswordSchema } from "../../../Schemas/AdminChangePasswordSchema";
import "./ChangePassword.css";
const serverApi = process.env.REACT_APP_DR_BULK_API;

const ChangePassword = () => {
  
  const [ t , i18n] = useTranslation()
  const navigate = useNavigate()

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginErrMsg , setLoginErrMsg] = useState("")

  const changePassword = (userData) =>{
    axios.post(`${serverApi}/api/admins/change-password`,userData
    , { headers: {
          Authorization: `Bearer ${localStorage.getItem('Token')}`
        }})
    .then(response=>{
      console.log(response);
      if(response.status === 200){
      toast.success(t("Password Changed Successfully ! "))
      localStorage.setItem('Token',response.data.token)
      navigate('/admin/home')
      setIsSubmitting(false)
      setLoginErrMsg(null)
    }
    })
    .catch(err=>{
      console.log(err);
      toast.error(t(err.response.data.message))
      setIsSubmitting(false)
      setLoginErrMsg(err.response.data.message)
    })
  }

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        newPassword :""
      }}
      onSubmit={(values, actions) => {
        setIsSubmitting(true);
        changePassword(values)
        actions.resetForm()
      }}
      validationSchema={AdminChangePasswordSchema}
    >
      {(props) => (
        <div className="container mt-5 ">
          <h3 className="text-center">{t("Set a new password")}</h3>
          <form onSubmit={props.handleSubmit} className={i18n.dir() === "ltr" ? "form" : "form ar-form"}  autoComplete="off">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                {t("Email")}
              </label>
              <Field
                name="email"
                className={
                  props.errors.email && props.touched.email
                    ? " input-error form-control"
                    : "form-control"
                }
                type="email"
                id="email"
                placeholder={t("Enter Your Email")}
              />
              {props.errors.email && props.touched.email ? (
                <p className="input-err-msg">{t(props.errors.email)}</p>
              ) : null}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                {t("Password")}
              </label>
              <Field
                name="password"
                className={
                  props.errors.password && props.touched.password
                    ? " input-error form-control"
                    : "form-control"
                }
                type="password"
                id="password"
                placeholder={t("Enter Your Password")}
              />
              {props.errors.password && props.touched.password ? (
                <p className="input-err-msg">{t(props.errors.password)}</p>
              ) : null}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                {t("New Password")}
              </label>
              <Field
                name="newPassword"
                className={
                  props.errors.newPassword && props.touched.newPassword
                    ? " input-error form-control"
                    : "form-control"
                }
                type="password"
                id="newPassword"
                placeholder={t("Enter Your New Password")}
              />
              {props.errors.newPassword && props.touched.newPassword ? (
                <p className="input-err-msg">{t(props.errors.newPassword)}</p>
              ) : null}
            </div>
            <div className="form-btns">
              <button
                disabled={isSubmitting}
                type="submit"
                className="btn btn-primary submit-btn bulk-btn"
              >
                <b>{t("Change password")}</b>
              </button>
              {isSubmitting ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                </>
              ) : null}
            </div>
            {loginErrMsg ? <p className="input-err-msg"> {t(loginErrMsg)}</p> : null }
          </form>
        </div>
      )}
    </Formik>
  );
};

export default ChangePassword;
