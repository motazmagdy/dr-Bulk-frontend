import React from "react";
import { Link } from 'react-router-dom'
import { Field, Formik } from "formik";
import { UserSignUpSchema } from "../../../Schemas/UserSignUpSchema";
import "./SignUp.css";
import { useTranslation } from "react-i18next";
import useSignup from '../../../Hooks/useSignup'

const UserSignUp = () => {
  const { signup, isSubmitting, signupErrMsg, setIsSubmitting } = useSignup()
  const { t, i18n } = useTranslation()

  const signupUser = (userData) => {
    signup(userData)
  }

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
        phoneNumber: ""
      }}
      onSubmit={(values, actions) => {
        setIsSubmitting(true);
        const { confirmPassword, ...signupData } = values
        signupUser(signupData)
        // actions.resetForm()
      }}
      validationSchema={UserSignUpSchema}
    >
      {(props) => (
        <div className="container mt-5 ">
          <h3 className="text-center">{t("Sign Up")}</h3>
          <form
            onSubmit={props.handleSubmit}
            className={i18n.dir() === "ltr" ? "form" : "form ar-form"}
            autoComplete="off">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                {t("Name")}
              </label>
              <Field
                name="name"
                type="text"
                className={
                  props.errors.name && props.touched.name
                    ? " input-error form-control"
                    : "form-control"
                }
                id="name"
              // placeholder={t("Enter Your Name")}
              />
              {props.errors.name && props.touched.name ? (
                <p className="input-err-msg">{t(props.errors.name)}</p>
              ) : null}
            </div>
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
              // placeholder={t("Enter Your Email")}
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
              // placeholder={t("Enter Your Password")}
              />
              {props.errors.password && props.touched.password ? (
                <p className="input-err-msg">{t(props.errors.password)}</p>
              ) : null}
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                {t("Confirm Password")}
              </label>
              <Field
                name="confirmPassword"
                className={
                  props.errors.confirmPassword && props.touched.confirmPassword
                    ? " input-error form-control"
                    : "form-control"
                }
                type="password"
                id="confirmPassword"
              // placeholder={t("Enter Your Password Again")}
              />
              {props.errors.confirmPassword && props.touched.confirmPassword ? (
                <p className="input-err-msg">{t(props.errors.confirmPassword)}</p>
              ) : null}
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                {t("Phone Number")}
              </label>
              <Field
                name="phoneNumber"
                className={
                  props.errors.phoneNumber && props.touched.phoneNumber
                    ? " input-error form-control"
                    : "form-control"
                }
                type="tel"
                id="phoneNumber"
              // placeholder={t("Enter Your Phone number")}
              />
              {props.errors.phoneNumber && props.touched.phoneNumber ? (
                <p className="input-err-msg">{t(props.errors.phoneNumber)}</p>
              ) : null}
            </div>
            <div className="mb-5 mt-4">
              <label className="form-label">{t("Gender")}</label>
              <div>
                <div className="form-check form-check-inline">
                  <Field
                    className="form-check-input"
                    checked={props.values.gender === "M"}
                    type="radio"
                    name="gender"
                    id="male"
                    value="M"
                  />
                  <label className="form-check-label" htmlFor="male">
                    {t("Male")}
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <Field
                    className="form-check-input"
                    checked={props.values.gender === "F"}
                    type="radio"
                    name="gender"
                    id="female"
                    value="F"
                  />
                  <label className="form-check-label" htmlFor="female">
                    {t("Female")}
                  </label>
                </div>
              </div>
            </div>
            <p className='redirect-user'>{t("Already have an account .")}<Link to='/login'>{t("Login Here")} </Link> </p>
            <div className="form-btns">
              <button
                disabled={isSubmitting}
                type="submit"
                className="btn btn-primary submit-btn bulk-btn"
              >
                <b>{t("Sign Up")}</b>
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
            {signupErrMsg ? <p className="input-err-msg">{t(signupErrMsg)}</p> : null}

          </form>
        </div>
      )}
    </Formik>
  );
};

export default UserSignUp;
