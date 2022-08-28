import { useState } from "react";
import Image from "next/image";
import style from "./MainPage.module.scss";

import { Filters } from "../filters";

export const MainPage = () => {
  let data = require("../assets/miista-export.json");
  const [productList, setProductList] = useState(
    data.data.allContentfulProductPage.edges
  );
  console.log("[DATA]", productList);
  // console.log(
  //   "[PRICE]",
  //   parseFloat(
  //     productList[0].node?.shopifyProductEu?.variants?.edges[0]?.node?.price
  //   )
  // );
  const [open, setOpen] = useState(false);
  const toggleFilterModal = () => {
    setOpen(!open);
  };

  return (
    <div className={style.container}>
      <h1 className={style.title}>Filter products</h1>
      <Image
        src="/filter-filled-tool-symbol.png"
        width="25px"
        height="25px"
        className={style.icon}
        alt="filter-icon"
        onClick={toggleFilterModal}
      />
      {open && (
        <Filters
          toggleModal={toggleFilterModal}
          data={productList}
          setData={setProductList}
        />
      )}
      <main className={style.main}>
        {productList.map((product, index) => {
          return (
            <div key={index} className={style.item}>
              <span>{product.node.name}</span>
              {product.node.categoryTags !== null ? (
                <div className={style.category}>
                  {product.node.categoryTags.map((category, index) => {
                    return <span key={index}>{category}</span>;
                  })}
                </div>
              ) : (
                ""
              )}
              {product.node.colorFamily !== null && (
                <span>{product.node.colorFamily[0].name}</span>
              )}
            </div>
          );
        })}
      </main>
    </div>
  );
};

export default MainPage;
