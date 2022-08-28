import { useState } from "react";

import style from "./FilterByColor.module.scss";

export const FilterByColor = ({ handleColorChange }) => {
  return (
    <div className={style.container}>
      <div className={style.container__labelWrapper}>
        <label className={style.container__label}>
          <h2>Color</h2>
        </label>
      </div>
      <select className={style.select} onChange={handleColorChange}>
        <option value="default"></option>
        <option value="Green">Green</option>
        <option value="Brown">Brown</option>
        <option value="White">White</option>
        <option value="Black">Black</option>
      </select>
    </div>
  );
};

export default FilterByColor;
