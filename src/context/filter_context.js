import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/filter_reducer";
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";
import { useProductsContext } from "./products_context";

const initialState = {
  filteredProducts: [],
  allProducts: [],
  gridView: true,
  filters: {
    search: "",
    company: "all",
    category: "all",
    color: "all",
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  const { products } = useProductsContext();
  // console.log("products" ,products)

  const [state, dispatch] = useReducer(reducer, initialState);

  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW });
  };
  const setListView = () => {
    dispatch({ type: SET_LISTVIEW });
  };
  //sort
  const updateSort = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    

    // dispatch({type:UPDATE_SORT,payload: value})
    dispatch({ type: SORT_PRODUCTS, payload: { name, value } });
  };
  
  ///load products
  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
   

  }, [products]);
  
  ///filters
  const updateFilters = (e) => {
    let name = e.target.name;
    
    let value = e.target.value;
    if(e.target.name === "price"){
      value = Number(value)
    }
    if(name === "shipping"){
      value = e.target.checked
    }

    
  
    dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
   
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };
  useEffect(()=>{
    
    dispatch({ type: FILTER_PRODUCTS });

  },[state.filters]);
  
  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        updateSort,
        updateFilters,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
