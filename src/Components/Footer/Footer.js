import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Footer.css";
import Logo from "../../Assets/Png Logo/Yellow.png";
import SocialIcons from "../../Ui/SocialIcons/SocialIcons";

const Footer = () => {
  const { t, i18n } = useTranslation();

  return (
    <footer>
      <div className="container  py-3 pt-5  footer">
        <div className="row text-decoration-none">
          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="mb-3 footerLabel">{t("Quick Links")}</h5>
            <ul className="mb-0">
              <li className="mb-1">
                <Link href="#!" to="/users/home">
                  {t("Home")}
                </Link>
              </li>
              <li className="mb-1">
                <Link href="#!" to="/users/plans-pricing">
                  {t("Plans & Pricing")}
                </Link>
              </li>
              <li className="mb-1">
                <Link href="#!" to="/users/instructors">
                  {t("Instructors")}
                </Link>
              </li>
              <li>
                <Link href="#!" to="/users/eat-smart">
                  {t("Eat Smart")}
                </Link>
              </li>
              <li className="mb-1">
                <Link href="#!" to="/users/apparel">
                  {t("Apparel")}
                </Link>
              </li>
              <li className="mb-1">
                <Link href="#!" to="/users/contactus">
                  {t("Contact us")}
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="mb-3 footerLabel">{t("Know more")}</h5>
            <ul className="list-unstyled mb-0">
              <li className="mb-1">
                <Link href="#!">{t("FAQ")}</Link>
              </li>
              <li className="mb-1">
                <Link href="#!">{t("Payment")}</Link>
              </li>
              <li className="mb-1">
                <Link href="#!">{t("Activate the card")}</Link>
              </li>
              <li>
                <Link href="#!">{t("Rules")}</Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="mb-3 footerLabel">{t("Follow us")}</h5>
            <SocialIcons size="lg" />
          </div>
          <div className="col-lg-3 col-md-6 mb-4">
            <img src={Logo} className="mb-3 footerImg" alt="logoImg"/>
          </div>
        </div>
      </div>
      <div className="text-center p-3 copyright">
        © 2023 {t("Copyright")} :
        <Link to="/users/home" className="fs-6">
          {t("Dr.Bulk")}
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
