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
    atozshort:(state,action)=>{
      state.data.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
      // console.log(state.data);
    },

    ztoashort:(state,action)=>{
      state.data.sort((a, b) => {
        if (a.name < b.name) return 1;
        if (a.name > b.name) return -1;
        return 0;
      });
    
    },

    
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

export const { atozshort, ztoashort,LowtoHigh,HightoLow,PricefilterRange} = ProductListSlice.actions;
export default ProductListSlice.reducer;
