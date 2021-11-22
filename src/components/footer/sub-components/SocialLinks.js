import React from "react";

const SocialLinks = () => {
  return (
    <>
      <div className="footer-social">
        <ul>
          <li>
            <a
              className="facebook"
              target="_blank"
              rel="noopener noreferrer"
              href="/"
            >
              <i className="fa fa-facebook" />
            </a>
          </li>
          <li>
            <a
              className="twitter"
              target="_blank"
              rel="noopener noreferrer"
              href="/"
            >
              <i className="fa fa-twitter" />
            </a>
          </li>
          <li>
            <a
              className="instagram"
              target="_blank"
              rel="noopener noreferrer"
              href="/"
            >
              <i className="fa fa-instagram" />
            </a>
          </li>

          <li>
            <a
              className="youtube"
              target="_blank"
              rel="noopener noreferrer"
              href="/"
            >
              <i className="fa fa-youtube" />
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SocialLinks;
