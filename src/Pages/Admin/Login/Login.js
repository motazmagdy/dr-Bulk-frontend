import React from "react";
import { useTranslation } from "react-i18next";
import { Field, Formik } from "formik";
import { AdminLoginSchema } from "../../../Schemas/AdminLoginSchema";
import useLogin from "../../../Hooks/useLogin";
import "./Login.css";

const AdminLogin = () => {

  const { t, i18n } = useTranslation()
  const { login, isSubmitting, setIsSubmitting, loginErrMsg } = useLogin()


  const loginUser = (userData) => {
    login(userData, "admins")
  }

  return (
    <Formik
      initialValues={{
        email: "",
        password: ""
      }}
      onSubmit={(values, actions) => {
        setIsSubmitting(true);
        loginUser(values)
        // actions.resetForm()
      }}
      validationSchema={AdminLoginSchema}
    >
      {(props) => (
        <div className="container mt-5 ">
          <h3 className="text-center">{t("Admin Login")}</h3>
          <form onSubmit={props.handleSubmit} className={i18n.dir() === "ltr" ? "form" : "form ar-form"} autoComplete="off">
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
            <div>
            </div>
            <div className="form-btns">
              <button
                disabled={isSubmitting}
                type="submit"
                className="btn btn-primary submit-btn bulk-btn"
              >
                <b>{t("Login")}</b>
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
            {loginErrMsg ? <p className="input-err-msg">{t(loginErrMsg)}</p> : null}
          </form>
        </div>
      )}
    </Formik>
  );
};

export default AdminLogin;
