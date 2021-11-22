import PropTypes from "prop-types";
import React from "react";
import {
  getIndividualCategories,
  getIndividualColors
} from "../../helpers/product";
import ShopSearch from "../../components/product/ShopSearch";
import ShopCategories from "../../components/product/ShopCategories";
import ShopColor from "../../components/product/ShopColor";



const ShopSidebar = ({ products, getSortParams, sideSpaceClass,}) => {
  const uniqueCategories = getIndividualCategories(products);
  const uniqueColors = getIndividualColors(products);

  return (
    <div className={`sidebar-style ${sideSpaceClass ? sideSpaceClass : ""}`}>
      {/* shop search */}
      <ShopSearch />

      {/* filter by categories */}
      <ShopCategories
        categories={uniqueCategories}
        getSortParams={getSortParams}
      />
     {/* filter by color */}
     <ShopColor colors={uniqueColors} getSortParams={getSortParams} />
    </div>
  );
};

ShopSidebar.propTypes = {
  getSortParams: PropTypes.func,
  products: PropTypes.array,
  sideSpaceClass: PropTypes.string,
};

export default ShopSidebar;
