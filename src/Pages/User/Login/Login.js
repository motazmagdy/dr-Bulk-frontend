import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Field, Formik } from "formik";
import axios from "axios";
import { UserLoginSchema } from "../../../Schemas/UserLoginSchema";
import { toast } from "react-toastify";
import "./Login.css";
const serverApi = process.env.REACT_APP_DR_BULK_API;

const UserLogin = () => {
  const [t, i18n] = useTranslation();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginErrMsg, setLoginErrMsg] = useState("");

  const loginUser = (userData) => {
    axios
      .post(`${serverApi}/api/users/login`, userData)
      .then((response) => {
        if (response.status === 201) {
          toast.success(t("Logged In Successfully ! "));
          localStorage.setItem("Token", response.data.token);
          localStorage.setItem("Role", "user");
          setIsSubmitting(false);
          setLoginErrMsg(null);
          navigate("/");
        }
      })
      .catch((err) => {
        if (err.response.data.message) {
          toast.error(t(err.response.data.message));
        } else {
          err.response.data.errors.forEach((err) => {
            toast.error(t(err.msg));
          });
        }
        setIsSubmitting(false);
        setLoginErrMsg(err.response.data.message);
      });
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={(values, actions) => {
        setIsSubmitting(true);
        loginUser(values);
        actions.resetForm();
      }}
      validationSchema={UserLoginSchema}
    >
      {(props) => (
        <div className="container mt-5 ">
          <h3 className="text-center">{t("Login")}</h3>
          <form
            onSubmit={props.handleSubmit}
            className={i18n.dir() === "ltr" ? "form" : "form ar-form"}
            autoComplete="off"
          >
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
            <p className="redirect-user">
              {t("Dont' have an account .")}
              <Link to="/signup">{t("Sign up Here")} </Link>{" "}
            </p>
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
            {loginErrMsg ? (
              <p className="input-err-msg"> {t(loginErrMsg)}</p>
            ) : null}
          </form>
        </div>
      )}
    </Formik>
  );
};

export default UserLogin;
