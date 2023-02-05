import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const STATUSES = Object.freeze({
  IDLE: "idle",
  LOADING: "loading",
  ERROR: "error",
});

const CartSlice = createSlice({
  name: "cartslice",
  initialState: {
    data: [],
    state: STATUSES.idle,
  },

  reducers: {
   
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCartDetails.pending, (state, action) => {
        state.status = STATUSES.LOADING;
        
      })
      .addCase(fetchCartDetails.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchCartDetails.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const fetchCartDetails = createAsyncThunk("cartslice", async () => {
  const email= "phargadeakshay@gmail.com"
  const res = await fetch(`https://ecommerstore.onrender.com/getcartdata`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email:email}),
  });
  const cartitems = await res.json();
  return cartitems;
});

export const {} = CartSlice.actions;
export default CartSlice.reducer;
