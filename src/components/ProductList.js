import React from "react";
import { useFilterContext } from "../context/filter_context";
import { useProductsContext } from "../context/products_context";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
  const { filteredProducts: products, gridView } = useFilterContext();
   const {isLoading} = useProductsContext();
   if(isLoading){
    return <h2>Loading... </h2>
   }
  if (products.length < 1) {
    return (
      <h5 style={{ textTransform: "none" }}>
        Sorry, no products matched your search
      </h5>
    );
  }
  if(!gridView){
    return <ListView products={products} />

  }
  return <GridView products={products} />;
};

export default ProductList;
