import { useState } from "react";
import style from "./FilterByPrice.module.scss";

export default function FilterByPrice({
  priceFrom,
  priceTo,
  handleChangePriceFrom,
  handleChangePriceTo,
  handleValidate,
}) {
  return (
    <div className={style.container}>
      <div className={style.container__labelWrapper}>
        <label className={style.container__label}>
          <h2>Price</h2>
        </label>
      </div>
      <div className={style.input__wrapper}>
        <input
          placeholder="From"
          type="number"
          onBlur={handleValidate}
          onChange={handleChangePriceFrom}
          name="price_from"
          min={0}
          value={priceFrom}
          className={style.inputLeft}
        />
        <input
          placeholder="To"
          type="number"
          onBlur={handleValidate}
          name="price_to"
          min={0}
          value={priceTo}
          onChange={handleChangePriceTo}
          className={style.inputRight}
        />
        <label>USD</label>
      </div>
    </div>
  );
}
