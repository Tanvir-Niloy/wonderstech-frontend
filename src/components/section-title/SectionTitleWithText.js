import PropTypes from "prop-types";
import React from "react";

const SectionTitleWithText = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div
      className={`welcome-area ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
    >
      <div className="container">
        <div className="welcome-content text-center">
          <h5>Who Are We</h5>
          <h1>Welcome To Wonders SmartShop BD</h1>
          <p>
        <strong>Leading Computer, Laptop & Gaming PC Retail & Online Shop in Bangladesh</strong>{" "}
           Technology has become a part of our daily lives and for a huge portion of our life, we are dependent on tech products daily. There is hardly a home in Bangladesh without a tech product. This is where we come in. Wonders SmartShop & Engineering Ltd had started as a Tech product shop way. We focused on giving the customers the best service possible. This is why  Wonders SmartShop is one of The most trusted names in the tech industry of Bangladesh today.{" "}
          </p>
          <br />
          <p>
          <strong>Best E-commerce Shop to order your desired Product</strong>
          {" "}Wonders SmartShop  always prioritizes its customers and to ensure better customer service started the e-commerce shop in addition to the physical stores. The goal was to meet more customer needs in the shortest time. Since then, We have had the top spot as the best E-commerce shop in Bangladesh. Our website has a comprehensive search option to find the desired product. Our website has a unique PC builder feature so that you can build a Custom PC with your desired components. We arrange many promotional campaigns on different occasions and also on a regular basis. Some of our most successful events are named Flash sale, Special offer, Thursday Thunder, Anniversary Special Offer, New Year Offer, 12.12 Campaign, and many more. We even arrange special gaming events and tournaments for Bangladeshi gamers with renowned gaming Brands like Razer and Asus ROG.
          </p>
        </div>
      </div>
    </div>
  );
};

SectionTitleWithText.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default SectionTitleWithText;
