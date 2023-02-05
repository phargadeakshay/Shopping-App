import { configureStore } from "@reduxjs/toolkit";
import ProductListSlice from "../Slices/ProductListSlice";
import CartSlice from "../Slices/CartSlice";

const store = configureStore({
    reducer: {
       productlistdata :ProductListSlice,
       cartdata:CartSlice

 
    },
  });
  
  export default store;