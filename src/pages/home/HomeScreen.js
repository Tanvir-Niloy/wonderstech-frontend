import React, { Fragment, useEffect } from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
import HeroSliderOne from "../../wrappers/hero-slider/HeroSliderOne";
import FeatureIcon from "../../wrappers/feature-icon/FeatureIcon";
import TabProduct from "../../wrappers/product/TabProduct";
import { fetchProducts } from "../../redux/actions/productActions";
import { useDispatch } from "react-redux";
import products from "../../data/products.json";
import HomeModal from '../../components/HomeModal'

const HomeScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts(products));
  }, [dispatch]);

  return (
    <Fragment>
      <MetaTags>
        <title>Wonders Tech</title>
        <meta
          name="description"
          content="Wonders Tech is the Best Laptop, Computer, Gaming PC, Component, Accessories, and Gadget retail & Online shop in Bangladesh."
        />
      </MetaTags>
      <LayoutOne
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-1"
      >

           {/*home modal */}
         {/* <HomeModal /> */}

        {/* hero slider */}
        <HeroSliderOne />

      

        {/* featured icon */}
        <FeatureIcon spaceTopClass="pt-100" spaceBottomClass="pb-60" />

        {/* tab product */}
        <TabProduct spaceBottomClass="pb-60" category="smartphone" />
      </LayoutOne>
    </Fragment>
  );
};

export default HomeScreen;
