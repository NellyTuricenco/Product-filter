import { useState, useRef, useEffect } from "react";
import Image from "next/image";

import style from "./MainPage.module.scss";

import { Filters } from "../filters";
import Pagination from "../utils/pagination/pagination";

export const MainPage = () => {
  let data = require("../assets/miista-export.json");
  const [productList, setProductList] = useState(
    data.data.allContentfulProductPage.edges
  );

  //handle modal open/close
  const [open, setOpen] = useState(false);
  const toggleFilterModal = () => {
    setOpen(!open);
  };

  //set pagination for the page
  const firstRender = useRef(true);
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let page = currentPage === 1 ? 0 : currentPage * 20 - 1;
    let cloneArr = [...productList];
    setList(cloneArr.splice(page, 20));
  }, [currentPage, productList]);

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
      <div className={style.pagination}>
        <Pagination
          handlePageChange={setCurrentPage}
          totalCount={productList.length}
          siblingCount={2}
          currentPage={currentPage}
          limit={20}
        />
      </div>
      <main className={style.main}>
        {list.map((product, index) => {
          return (
            <div key={index} className={style.item}>
              <span className={style.name}>{product.node.name}</span>
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
              <span className={style.price}>
                {parseFloat(
                  product.node?.shopifyProductEu?.variants?.edges[0]?.node
                    ?.price
                )}{" "}
                USD
              </span>
            </div>
          );
        })}
      </main>
    </div>
  );
};

export default MainPage;
