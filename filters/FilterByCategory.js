import style from "./FilterByColor.module.scss";

export const FilterByCategory = ({ handleCategoryChange }) => {
  return (
    <div className={style.container}>
      <div className={style.container__labelWrapper}>
        <label className={style.container__label}>
          <h2>Category</h2>
        </label>
      </div>
      <select className={style.select} onChange={handleCategoryChange}>
        <option value="default"></option>
        <option value="Sandals">Sandals</option>
        <option value="Mid-Heels">Mid-Heels</option>
        <option value="Mules">Mules</option>
        <option value="Bags">Bags</option>
        <option value="New Arrivals">New Arrivals</option>
      </select>
    </div>
  );
};
export default FilterByCategory;
