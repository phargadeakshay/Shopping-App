import { configureStore } from "@reduxjs/toolkit";
import ProductListSlice from "../Slices/ProductListSlice";
import CartSlice from "../Slices/CartSlice";
import AddToCartSlice from "../Slices/AddToCartSlice";

const store = configureStore({
    reducer: {
       productlistdata :ProductListSlice,
       cartdata:CartSlice,
       addtocartstore:AddToCartSlice


 
    },
  });
  
  export default store;