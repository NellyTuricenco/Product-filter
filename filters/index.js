import { useState } from "react";

import FilterByPrice from "./FilterByPrice";
import FilterByColor from "./FilterByColor";
import FilterByCategory from "./FilterByCategory";

import style from "./Filters.module.scss";

export const Filters = ({ toggleModal, data, setData }) => {
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

  const handleApply = () => {
    const filteredList = data.filter(
      (el) =>
        (parseFloat(el.node?.shopifyProductEu?.variants?.edges[0].node.price) >=
          Number(priceFrom) &&
          parseFloat(
            el.node?.shopifyProductEu?.variants?.edges[0].node.price
          ) <= Number(priceTo)) ||
        (el.node?.colorFamily !== null &&
          el.node?.colorFamily[0]?.name === color) ||
        el.node?.categoryTags?.includes(category)
    );
    setData(filteredList);
    console.log({ filteredList });
  };
  return (
    <div className={style.container}>
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
      <FilterByColor handleColorChange={handleColorChange} />
      <FilterByCategory handleCategoryChange={handleCategoryChange} />
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
