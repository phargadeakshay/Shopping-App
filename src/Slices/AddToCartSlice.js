import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { url } from "../Url";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  LOADING: "loading",
  ERROR: "error",
});

const AddToCartSlice = createSlice({
  name: "addtocart",
  initialState: {
    data: [],
    status: STATUSES.IDLE,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchToCart.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchToCart.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchToCart.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const fetchToCart = createAsyncThunk(
  "addtocart/fetch",
  async (data) => {
    const res = await fetch(`${url}/addtocart`, {
      method:"post",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    const resData = await res.json();
    Swal.fire({
        position: 'middle',
        icon: 'success',
        title: resData,
        showConfirmButton: false,
        timer: 1500
      })
    console.log(resData, "check Response From Api");
    return resData;
  }
);  

export const {} = AddToCartSlice.actions;
export default AddToCartSlice.reducer;

