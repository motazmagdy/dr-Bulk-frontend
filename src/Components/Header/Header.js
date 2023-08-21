import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAuthContext from "../../Hooks/AuthContextHook";
import "./Header.css";
import B from "../../Assets/Png Logo/B-only.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF , faXTwitter , faTwitter ,faYoutube ,faInstagram} from "@fortawesome/free-brands-svg-icons";
import "../../Ui/SocialIcons/SocialIcons.css";
import useLogout from "../../Hooks/useLogout";

const Header = () => {

  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { logout } = useLogout()
  const { state } = useAuthContext()

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

  const handleLogout = () => {
    logout()
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">  
        <img src={B} className="logoImg" onClick={() => navigate("/users/home")} alt="logoImg"/>
        <button
          className={`navbar-toggler bg-light header-btn ${i18n.dir() === "rtl" ? "btnAr" : "btnEn" }`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      <div className="container noMargin">
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
              <li className="nav-item">
                <Link
                  className="nav-link language-btn"
                  value={"ar"}
                  onClick={changeLanguage}
                >
                  {t("ChangeLangauge")}
                </Link>
              </li>
            <div className="user-action">
        {!state.userRole ? (
              <button className="login-item btn">
                <Link to="/users/login">
                  {" "}
                  <b>{t("Login")}</b>
                </Link>{" "}
              </button>
            ) : null}
            {!state.userRole ? (
              <button className="signup-item btn">
                <Link to="/users/signup">
                  {" "}
                  <b>{t("Signup")}</b>
                </Link>{" "}
              </button>
            ) : null}
            {state.userRole && state.userRole === "admin" ? (
              <li className="signup-item btn">
                <Link className="" to="/admin/change-password">
                  {" "}
                  {t("Change password")}
                </Link>{" "}
              </li>
            ) : null}
            {state.userRole ? (
              <li className="signup-item btn">
                <Link className="logout" onClick={handleLogout}>
                  {" "}
                  {t("Logout")}
                </Link>{" "}
              </li>
            ) : null}
      </div>
      <li className="mb-1">
                <Link href="#!">
                  <button className="btn iconContainerHeader">
                    <FontAwesomeIcon icon={faFacebookF} size="sm" />
                  </button>
                </Link>
              </li>
              <li className="mb-1">
                <Link href="#!">
                  <button className="btn iconContainerHeader">
                  <FontAwesomeIcon icon={faXTwitter} size="sm" />
                  </button>
                </Link>
              </li>
              <li className="mb-1">
                <Link href="#!">
                  <button className="btn iconContainerHeader">
                  <FontAwesomeIcon icon={faTwitter} size="sm" />
                  </button>
                </Link>
              </li>
              <li className="mb-1">
                <Link href="#!">
                  <button className="btn iconContainerHeader">
                  <FontAwesomeIcon icon={faYoutube} size="sm" />
                  </button>
                </Link>
              </li>
              <li className="mb-1">
                <Link href="#!">
                  <button className="btn iconContainerHeader">
                  <FontAwesomeIcon icon={faInstagram} size="sm" />
                  </button>
                </Link>
              </li>
      </ul>
          </div>
      </div>
      
    </nav>
  );
};

export default Header;
