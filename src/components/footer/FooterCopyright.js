import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

const FooterCopyright = ({ footerLogo, spaceBottomClass, colorClass }) => {
  return (
    <div
      className={`copyright ${spaceBottomClass ? spaceBottomClass : ""} ${
        colorClass ? colorClass : ""
      }`}
    >
      <div className="footer-logo">
        <Link to={process.env.PUBLIC_URL + "/"}>
          <img alt="" src={process.env.PUBLIC_URL + footerLogo} />
        </Link>
      </div>
    

      <div className="app-store-google">
        <a>
          <img src="/assets/img/brand-logo/apps-google.png" />
        </a>
      </div>
    </div>
  );
};

FooterCopyright.propTypes = {
  footerLogo: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  colorClass: PropTypes.string,
};

export default FooterCopyright;
