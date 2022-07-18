import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/products_reducer'
import { products_url as url } from '../utils/constants'
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

const initialState = {
  isSidebarOpen: false,
  productsLoading : false,
  productsError : false,
  products : [],
  featuredProducts : [],
  singleProduct: {},
  singleProductLoading: false,
  singleProductError: false,
  isLoading : false,
  



}

const ProductsContext = React.createContext()

export const ProductsProvider = ({ children }) => {
  const [state,dispatch] = useReducer(reducer,initialState)
  
  const openSidebar = ()=>{
    dispatch({type:SIDEBAR_OPEN})
  }
  const closeSidebar = ()=>{
    dispatch({type:SIDEBAR_CLOSE})
  }
  const fetchProducts = async(url) =>{
    dispatch({type:GET_PRODUCTS_BEGIN})
    
    try{
      const res = await axios.get(url);
      const products = res.data;
      
      dispatch({type:GET_PRODUCTS_SUCCESS,payload : products})
    }catch(e){
       dispatch({type:GET_PRODUCTS_ERROR})
    }
    
  }

  const fetchSingleProduct = async(url) =>{
     dispatch({type:GET_SINGLE_PRODUCT_BEGIN})
     try{
   const res = await axios.get(url);
   const singleProduct = res.data;
   dispatch({type: GET_SINGLE_PRODUCT_SUCCESS,payload: singleProduct})
     }catch(e){
      dispatch({type :GET_SINGLE_PRODUCT_ERROR})
     }
  }

  useEffect(()=>{
      fetchProducts(url)
  },[])
  return (
    <ProductsContext.Provider value={
      {
        ...state,
        closeSidebar,
        openSidebar,
        fetchSingleProduct,
        
      }
    }>
      {children}
    </ProductsContext.Provider>
  )
}
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext)
}
