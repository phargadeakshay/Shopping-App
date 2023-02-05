import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const STATUSES = Object.freeze({
  IDLE: "idle",
  LOADING: "loading",
  ERROR: "error",
});

const ProductListSlice = createSlice({
  name: "productdatastore",
  initialState: {
    data: [],
    status: STATUSES.IDLE,
  },

  reducers: {
    AtoZshort:(state,action)=>{
      state.data= state.data.sort()
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchproductdata.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchproductdata.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchproductdata.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const fetchproductdata = createAsyncThunk(
  "productdata/fetch",
  async () => {
    const response = await fetch(`https://ecommerstore.onrender.com/gettshirtlist`, {
      method:"GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    const jsonresponse = await response.json();
    console.log(jsonresponse, "xzasdddd");
    return jsonresponse;
  }
);  

export const {AtoZshort} = ProductListSlice.actions;
export default ProductListSlice.reducer;
