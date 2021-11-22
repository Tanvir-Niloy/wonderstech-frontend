import PropTypes from "prop-types";
import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import SectionTitleWithText from "../../components/section-title/SectionTitleWithText";


const About = ({ location }) => {
  const { pathname } = location;

  return (
    <Fragment>
      <MetaTags>
      <title>Wonders Tech | About Us</title>
        <meta
          name="description"
          content="About Page of Wonders Tech is the Best Laptop, Computer, Gaming PC, Component, Accessories, and Gadget retail & Online shop in Bangladesh."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        About us
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />

        {/* section title with text */}
        <SectionTitleWithText spaceTopClass="pt-100" spaceBottomClass="pb-95" />
 
      </LayoutOne>
    </Fragment>
  );
};

About.propTypes = {
  location: PropTypes.object,
};

export default About;
