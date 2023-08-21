import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./SectionsSlider.css";
import { AnimatePresence, motion } from "framer-motion";
import HomeImage from "../../Assets/Slider/home.jpg";
import PlansPrices from "../../Assets/Slider/plans prices.jpg";
import Apparel from "../../Assets/Slider/apparel.jpg";
import EatSmart from "../../Assets/Slider/eat smart.jpg";
import ContactUs from "../../Assets/Slider/contactus.jpg";

const variants = {
  initial: (direction) => {
    return {
      x: direction > 0 ? 200 : -200,
      opacity: 0,
    };
  },
  animate: {
    x: 0,
    opacity: 1,
    transition : {
        x : {type:"spring" , stiffness:300 , damping : 30 },
        opacity : { duration : 0.2}
    }
  },
  exit: (direction) => {
    return {
      x:direction < 0 ? -200 : 200,
      opacity: 0,
      transition : {
        x : {type:"spring" , stiffness:300 , damping : 30 },
        opacity : { duration : 0.2}
    }
    };
  },
};

const SectionsSlider = () => {

  const { t } = useTranslation()

  const [img, setImg] = useState(0);
  const [direction, setDirection] = useState(0);
  const Imgs = [HomeImage, PlansPrices, Apparel, EatSmart, ContactUs];

  const nextImg = () => {
    setDirection(1);
    if (img === Imgs.length - 1) {
      setImg(0);
    } else {
      setImg(img + 1);
    }
  };

  const prevImg = () => {
    setDirection(-1);
    if (img === 0) {
      setImg(Imgs.length - 1);
    } else {
      setImg(img - 1);
    }
  };

  useEffect(()=>{
      const changeImage = setInterval(()=>{
        nextImg()
      },2000)

      return ()=>{
        clearInterval(changeImage)
      }
  },[img])

  return (
    <div className="sliderContainer">
      <AnimatePresence initial={false} custom={direction}>
        <div className="slider">
          <motion.img
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            key={Imgs[img]}
            src={Imgs[img]}
            custom={direction}
            alt="sectionsSlides"
            className="sliderImage"
          />
          <button className="slideBtn prevB" onClick={prevImg}>
            &#8592;
          </button>
          <button className="slideBtn nextB" onClick={nextImg}>
            &#8594;
          </button>
          <p className="pSlides">
            {t("Welcome to")}{" "}
            <span className="bulkWork">
              <b>{t("Dr.Bulk")}</b>
            </span>{" "}
            , {t("all your GOALS can be achieved")} <br />
            <i>
              {t("Join now and subscribe to one of our Plans , You will find one that Suits you .")}
              
            </i>
          </p>
          <button className="actionBtn btn">{t("Join Now")}</button>
        </div>
      </AnimatePresence>
    </div>
  );
};

export default SectionsSlider;
