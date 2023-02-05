import { configureStore } from "@reduxjs/toolkit";
import ProductListSlice from "../Slices/ProductListSlice";


const store = configureStore({
    reducer: {
       productlistdata :ProductListSlice,
       

 
    },
  });
  
  export default store;