import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Header.css";
import B from "../../Assets/PngLogo/Yellow.png";

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
    navigate("/");
  };

  return (
    <>
      <div className="header-wrapper">
        <div className="social" dir="ltr">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="social-container">
                  <a href="#"><span><i className="fa fa-facebook"></i></span></a>
                  <a href="#"><span><i className="fa fa-twitter"></i></span></a>
                  <a href="#"><span><i className="fa fa-whatsapp"></i></span></a>
                  <a href="#"><span><i className="fa fa-linkedin"></i></span></a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <nav className="navbar navbar-expand-lg rounded-0">
          <Link to="/">
            <img src={B} className="brand-icon" alt="logo icon" />
          </Link>
          <button
            className="navbar-toggler header-btn"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* <div className="container ps-5"> */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <div id="navigation">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    {t("Home")}
                  </NavLink>
                </li>
                <li className="nav-item has-sub">
                  <Link className="nav-link" to='/plans-pricing' onClick={e => e.preventDefault()}>
                    {t("Plans & Pricing")}
                  </Link>
                  <ul>
                    <li><Link to='/plans-pricing/gym-membership' title="Gym Membership">Gym Membership</Link></li>
                    <li><Link to='/plans-pricing/private-training' title="Private Training">Private Training</Link></li>
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
                <li className="nav-item has-sub">
                  <NavLink className="nav-link" to='/apparel' onClick={e => e.preventDefault()}>
                    {t("Apparel")}
                  </NavLink>
                  <ul>
                    <li><Link to='/shop' title="shop">Shop</Link></li>
                  </ul>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/contactus">
                    {t("Contact us")}
                  </NavLink>
                </li>

                <li className="btns">
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
                    {!isLoggedIn ? (
                      <button className="bulk-btn btn login-item">
                        <Link to="/login">
                          {" "}
                          <b>{t("Login")}</b>
                        </Link>{" "}
                      </button>
                    ) : null}
                  </div>
                  <div className="user-action">
                    {!isLoggedIn ? (
                      <button className="bulk-dark-btn btn signup-item">
                        <Link to="/signup">
                          {" "}
                          <b>{t("Signup")}</b>
                        </Link>{" "}
                      </button>
                    ) : null}
                    {isLoggedIn && role === "admin" ? (
                      <button className="bulk-dark-btn btn">
                        <Link to="/admin/change-password">
                          {" "}
                          {t("Change password")}
                        </Link>{" "}
                      </button>
                    ) : null}
                    {isLoggedIn ? (
                      <button className="bulk-dark-btn btn">
                        <NavLink onClick={handleLogout}>
                          {" "}
                          {t("Logout")}
                        </NavLink>{" "}
                      </button>
                    ) : null}
                  </div>
                </li>
              </ul>
            </div>
          </div>


          {/* </div> */}

        </nav>
      </div>
    </>
  );
};

export default Header;
