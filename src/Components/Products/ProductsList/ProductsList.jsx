import { Box, Grid, Pagination, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { productContext } from "../../../context/ProductContextProvider";
import Filter from "../../Filter/Filter";
import ProductCard from "../ProductCard/ProductCard";

const ProductsList = () => {
  const { productsArr, readProduct, pageTotalCount } =
    useContext(productContext);
  const [paramsSearch, setParamsSearch] = useSearchParams();
  const [category, setCategory] = useState("all");
  const [price, setPrice] = useState([0, 200000]);
  const [page, setPage] = useState(1);
  // useEffect(() => {
  //   if (category === "all") {
  //     setParamsSearch({
  //       price_gte: price[0],
  //       price_lte: price[1],
  //       q: paramsSearch.get("q") || "", // null || ""
  //       _page: page,
  //       _limit: 3,
  //     });
  //   } else {
  //     setParamsSearch({
  //       category: category,
  //       price_gte: price[0],
  //       price_lte: price[1],
  //       _page: page,
  //       _limit: 3,
  //     });
  //   }
  // }, [paramsSearch, category, price, page]);

  // useEffect(() => {
  //   readProduct();
  // });
  useEffect(() => {
    readProduct();
  }, [paramsSearch, pageTotalCount]);

  return (
    <>
      <Grid sx={{ width: "50%", margin: "10px auto" }}>
        <Filter
          category={category}
          setCategory={setCategory}
          price={price}
          setPrice={setPrice}
        />
      </Grid>
      <Grid
        id="prodCard"
        container
        // direction="row"
        justifyContent="space-around"
        // alignItems="flex-start"
        sx={{ width: "90%" }}
        mx="auto"
        my="40px">
        {productsArr ? (
          productsArr.map(item => (
            <Grid item={true} xs={3.5} mb={7} key={item.id}>
              {console.log(item)}
              <ProductCard obj={item} />
            </Grid>
          ))
        ) : (
          <h1>Error</h1>
        )}
      </Grid>
      <Grid
        sx={{ width: "30%", display: "flex", justifyContent: "center" }}
        mx="auto"
        my="20px">
        <Pagination
          color="primary"
          count={+pageTotalCount}
          page={+page}
          onChange={(e, value) => setPage(value)}
        />
      </Grid>
    </>
  );
};

export default ProductsList;
