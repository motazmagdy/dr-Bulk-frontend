import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAuthContext from "../../Hooks/AuthContextHook";
import useLogout from "../../Hooks/useLogout";
import "./Header.css";
import B from "../../Assets/PngLogo/Yellow.png";

const Header = () => {
  const navigate = useNavigate();
  const { t, i18n} = useTranslation();
  const { logout } = useLogout()
  const { state } = useAuthContext()
  const handleLogout = () => {
      logout()
    }
  const changeLanguage = (e) => {
    if (i18n.dir() === "rtl") {
      i18n.changeLanguage("en");
      localStorage.setItem("DEFAULT_LANG", "en");
    } else {
      i18n.changeLanguage("ar");
      localStorage.setItem("DEFAULT_LANG", "ar");
    }
    document.body.dir = i18n.dir();
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg rounded-0 header-wrapper">
        <img as={Link} src={B} className="brand-icon" alt="logo icon" onClick={() => navigate("/")} />
        <button
          className="navbar-toggler bg-light header-btn"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="container">
          <div className="collapse navbar-collapse" id="navbarNav">
            <div id="navigation">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/home">
                    {t("Home")}
                  </NavLink>
                </li>
                <li className="nav-item has-sub">
                  <NavLink className="nav-link" to="/plans-pricing">
                    {t("Plans & Pricing")}
                  </NavLink>
                  <ul>
                    <li><a href="#" title="Gym Membership">Gym Membership</a></li>
                    <li><a href="#" title="Private Training">Private Training</a></li>
                  </ul>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/instructors">
                    {t("Instructors")}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/eat-smart">
                    {t("Eat Smart")}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/apparel">
                    {t("Apparel")}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/contactus">
                    {t("Contact us")}
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="lang">
          <button
            className="btn btn-dark language-btn"
            value={"ar"}
            onClick={changeLanguage}
          >
            {t("ChangeLangauge")}
          </button>
        </div>
        <div className="user-action">
          {!state.userRole ? (
            <button className="login-item btn">
              <NavLink to="/login">
                {" "}
                <b>{t("Login")}</b>
              </NavLink>{" "}
            </button>
          ) : null}
          {!state.userRole ? (
            <button className="signup-item btn">
              <NavLink to="/signup">
                {" "}
                <b>{t("Signup")}</b>
              </NavLink>{" "}
            </button>
          ) : null}
          {state.userRole ? (
            <li className="signup-item btn">
              <NavLink className="logout" onClick={handleLogout}>
                {" "}
                {t("Logout")}
              </NavLink>{" "}
            </li>
          ) : null}
        </div>
      </nav>

      {/* <nav className="navbar navbar-expand-lg bg-dark rounded-0 header-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-lg-1 col-md-1 col-sm-12 col-xs-12">
              <Link to="/">
                <img src={B} className="brand-icon" alt="brand icon" />
              </Link>

            </div>
            <div className="col-lg-6 col-md-8 col-sm-10 col-xs-10">
              <div className="navigation">
                <div id="navigation">
                  <ul>
                    <li className="active"><a href="index.html" title="Home">Home</a></li>

                    <li className="has-sub"><a href="blog-default.html" title="Blog ">Blog</a>
                      <ul>
                        <li><a href="blog-default.html" title="Blog">Blog Default</a></li>
                        <li><a href="blog-single.html" title="Blog Single ">Blog Single</a></li>
                      </ul>
                    </li>

                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-2 hidden-md hidden-sm hidden-xs">
              <div className="header-btn"><a href="#" className="btn btn-default">get started</a></div>
            </div>

            <div className="col-lg-2 lang">
              <button
                className="btn language-btn"
                value={"ar"}
                onClick={changeLanguage}
              >
                {t("ChangeLangauge")}
              </button>
            </div>

            <div className="col-lg-2 user-action">
              {!isLoggedIn ? (
                <button className="btn login-item">
                  <NavLink to="/login">
                    {" "}
                    <b>{t("Login")}</b>
                  </NavLink>{" "}
                </button>
              ) : null}
              {!isLoggedIn ? (
                <button className="btn signup-item">
                  <NavLink to="/signup">
                    {" "}
                    <b>{t("Signup")}</b>
                  </NavLink>{" "}
                </button>
              ) : null}
              {isLoggedIn && role === "admin" ? (
                <li className="signup-item btn">
                  <NavLink className="" to="/admin/change-password">
                    {" "}
                    {t("Change password")}
                  </NavLink>{" "}
                </li>
              ) : null}
              {isLoggedIn ? (
                <li className="signup-item btn">
                  <NavLink className="logout" onClick={handleLogout}>
                    {" "}
                    {t("Logout")}
                  </NavLink>{" "}
                </li>
              ) : null}
            </div>
          </div>
        </div>
      </nav> */}
    </>
  );
};

export default Header;
