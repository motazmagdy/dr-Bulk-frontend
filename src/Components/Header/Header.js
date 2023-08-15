import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Header.css";


const Header = () => {
  const navigate = useNavigate();
  const [t, i18n] = useTranslation();

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


  const [isLoggedIn, setIsLogged] = useState(localStorage.getItem("Token"));
  const [role, setRole] = useState(localStorage.getItem("Role"));

  const handleLogout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("Role");
    navigate("/users/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      <div className="container">
        <Link className="navbar-brand text-light" to="/">
          Dr BULK
        </Link>
        <button
          className="navbar-toggler bg-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/users/home">
                {t("Home")}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/users/plans-pricing">
                {t("Plans & Pricing")}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/users/instructors">
                {t("Instructors")}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/users/eat-smart">
                {t("Eat Smart")}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/users/apparel">
                {t("Apparel")}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/users/contactus">
                {t("Contact us")}
              </Link>
            </li>
            {!isLoggedIn ? (
              <li className="nav-item">
                <Link className="nav-link" to="/users/login">
                  {" "}
                  {t("Login")}
                </Link>{" "}
              </li>
            ) : null}
            {!isLoggedIn ? (
              <li className="nav-item">
                <Link className="nav-link" to="/users/signup">
                  {" "}
                  {t("Signup")}
                </Link>{" "}
              </li>
            ) : null}
            {isLoggedIn && role === "admin" ? (
              <li className="nav-item">
                <Link className="nav-link" to="/admin/change-password">
                  {" "}
                  {t("Change password")}
                </Link>{" "}
              </li>
            ) : null}
            {isLoggedIn ? (
              <li className="nav-item">
                <a className="nav-link logout" onClick={handleLogout}>
                  {" "}
                  {t("Logout")}
                </a>{" "}
              </li>
            ) : null}
          </ul>
        </div>
        <span className="language-btn" value={"ar"} onClick={changeLanguage}>
          {t("ChangeLangauge")}
        </span>
      </div>
    </nav>
  );
};

export default Header;
