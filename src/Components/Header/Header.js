import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Header.css";
import B from "../../Assets/PngLogo/Yellow.png";
import { useCart } from '../../Context/CartContext';
import useLogout from "../../Hooks/useLogout";
import useAuthContext from "../../Hooks/AuthContextHook";

const Header = () => {
  const navigate = useNavigate();
  const [t, i18n] = useTranslation();
  const { state } = useAuthContext()
  const { logout } = useLogout()

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
    logout()
  };

  const { cartItems } = useCart()

  return (
    <>
      <div className="header-wrapper">
        <div className="social" dir="ltr">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="social-container">
                  <Link to='/'><span><i className="fa fa-facebook"></i></span></Link>
                  <Link to='/'><span><i className="fa fa-twitter"></i></span></Link>
                  <Link to='/'><span><i className="fa fa-whatsapp"></i></span></Link>
                  <Link to='/'><span><i className="fa fa-linkedin"></i></span></Link>
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
                  {/* <div className="user-action">
                    {!state.userRole ? (
                      <button className="bulk-btn btn login-item">
                        <Link to="/login">
                          {" "}
                          <b>{t("Login")}</b>
                        </Link>{" "}
                      </button>
                    ) : null}
                  </div> */}
                  <div className="user-action">
                    {!state.userRole ? (
                      <button className="bulk-dark-btn btn signup-item">
                        <Link to="/signup">
                          {" "}
                          <b>{t("Signup")}</b>
                        </Link>{" "}
                      </button>
                    ) : null}
                    { state.userRole  ? (
                      <button className="bulk-dark-btn btn">
                        <NavLink onClick={handleLogout}>
                          {" "}
                          {t("Logout")}
                        </NavLink>{" "}
                      </button>
                    ) : null}
                  </div>

                  <div className='cartIcon'>
                    <Link to='/cart'>
                      <div className="cart">
                        <i className="fa fa-shopping-cart me-2" aria-hidden="true"></i>
                      </div>
                      <div className="cartItemsIcon"><span>{cartItems.length}</span></div>
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          </div>

        </nav>
      </div>
    </>
  );
};

export default Header;
