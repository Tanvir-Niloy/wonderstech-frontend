import PropTypes from "prop-types";
import React from "react";
import { changeLanguage } from "redux-multilanguage";

const LanguageCurrencyChanger = ({
  currency,
  setCurrency,
  currentLanguageCode,
  dispatch,
}) => {
  const changeLanguageTrigger = (e) => {
    const languageCode = e.target.value;
    dispatch(changeLanguage(languageCode));
  };

  const setCurrencyTrigger = (e) => {
    const currencyName = e.target.value;
    setCurrency(currencyName);
  };

  return (
    <div className="language-currency-wrap">
      <div className="same-language-currency language-style">
        <span>
          {currentLanguageCode === "en"
            ? "English"
            : currentLanguageCode === "fn"
            ? "French"
            : currentLanguageCode === "de"
            ? "Germany"
            : ""}{" "}
          <i className="fa fa-angle-down" />
        </span>
        <div className="lang-car-dropdown">
          <ul>
            <li>
              <button value="en" onClick={(e) => changeLanguageTrigger(e)}>
                English
              </button>
            </li>
            <li>
              <button value="en" onClick={(e) => changeLanguageTrigger(e)}>
                Bangla
              </button>
            </li>
    
          </ul>
        </div>
      </div>
      <div className="same-language-currency">
        <p>Call Us +8801150338042 </p>
      </div>
    </div>
  );
};

LanguageCurrencyChanger.propTypes = {
  setCurrency: PropTypes.func,
  currency: PropTypes.object,
  currentLanguageCode: PropTypes.string,
  dispatch: PropTypes.func,
};

export default LanguageCurrencyChanger;
