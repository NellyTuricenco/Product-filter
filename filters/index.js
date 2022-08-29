import { useEffect, useState, useCallback } from "react";

import FilterByPrice from "./FilterByPrice";
import FilterByColor from "./FilterByColor";
import FilterByCategory from "./FilterByCategory";

import style from "./Filters.module.scss";

export const Filters = ({ toggleModal, setData }) => {
  let list = require("../assets/miista-export.json");
  const products = list.data.allContentfulProductPage.edges;

  //variables nad event handlers for the price filter
  const [priceFrom, setPriceFrom] = useState(0.0);
  const [priceTo, setPriceTo] = useState(10000.0);

  const handleChangePriceFrom = (e) => {
    setPriceFrom(e.target.value);
  };
  const handleChangePriceTo = (e) => {
    setPriceTo(e.target.value);
  };
  const handleValidate = () => {
    if (priceFrom > priceTo) {
      setPriceTo(priceFrom);
    }
  };

  //variables nad event handlers for the color filter
  const [color, setColor] = useState("");
  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  //variables nad event handlers for the category filter
  const [category, setCategory] = useState("");
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  //handle filtering the product list based on the selected filters
  const handleApply = useCallback(() => {
    let filteredProducts = products.filter((el) => {
      return (
        parseFloat(el.node?.shopifyProductEu?.variants?.edges[0].node.price) >=
          Number(priceFrom) &&
        parseFloat(el.node?.shopifyProductEu?.variants?.edges[0].node.price) <=
          Number(priceTo)
      );
    });
    if (color) {
      filteredProducts = filteredProducts.filter((el) => {
        if (el.node?.colorFamily !== null) {
          return el.node?.colorFamily[0]?.name === color;
        }
      });
    }

    if (category) {
      filteredProducts = filteredProducts.filter((el) =>
        el.node?.categoryTags?.includes(category)
      );
    }

    setData(filteredProducts);
  }, [color, setData, category, priceFrom, priceTo, products]);

  //clear filters handler
  const handleClearFilter = () => {
    setColor("");
    setCategory("");
    setPriceFrom(0);
    setPriceTo(10000);
  };

  return (
    <div className={style.container}>
      <button className={style.clear} onClick={handleClearFilter}>
        Clear filter
      </button>
      <span className={style.close} onClick={toggleModal}>
        X
      </span>
      <FilterByPrice
        priceFrom={priceFrom}
        priceTo={priceTo}
        handleChangePriceFrom={handleChangePriceFrom}
        handleChangePriceTo={handleChangePriceTo}
        handleValidate={handleValidate}
      />
      <FilterByColor value={color} handleColorChange={handleColorChange} />
      <FilterByCategory
        value={category}
        handleCategoryChange={handleCategoryChange}
      />
      <button
        className={style.btn}
        onClick={() => {
          handleApply();
          toggleModal();
        }}
      >
        Apply
      </button>
    </div>
  );
};
export default FilterByPrice;
