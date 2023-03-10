import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { url } from "../Url";
import Swal from "sweetalert2";
export const STATUSES = Object.freeze({
  IDLE: "idle",
  LOADING: "loading",
  ERROR: "error",
});

const CartSlice = createSlice({
  name: "cartslice",
  initialState: {
    data: [],
    localdata: [],
    state: STATUSES.idle,
  },

  reducers: {
    increament:(state, action)=> {
        for (var i in state.data) {
          if (state.data[i]._id === action.payload) {
            state.data[i].quantity +=1 ;
             break; //Stop this loop, we found it!
          }
        }

      },
    decreament:(state, action)=> {
        for (var i in state.data) {
          if (state.data[i]._id === action.payload && state.data[i].quantity >1) {
            state.data[i].quantity -=1 ;
            // console.log("remove form cart kkkkkkkkkkk");
             break; 
             //Stop this loop, we found it!
          }
          else{
            removecart(action.payload)
          }
        }

      },
      
      removecart:(state, action)=> {
        state.data = state.data.filter((item) => item._id !== action.payload);
        Swal.fire({
          position: 'middle',
          icon: 'success',
          title:"Remove Item Succefull Form Cart",
          showConfirmButton: false,
          timer: 2500
        })
        // console.log(action.payload,"remove form cart tttttttttttttt");
      },

      // Addtocartlocal:(state,action)=>{
      // // state.data=[...action.payload]
      // state.localdata.push(action.payload)
      // console.log(action.payload,"aaaaaaaaaaaaaaaaaaaa")
      // }
      Addtocartlocal:(state,action)=>{
      // state.data=[...action.payload]
      state.data.push(action.payload)
      console.log(action.payload,"aaaaaaaaaaaaaaaaaaaa")
      }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCartDetails.pending, (state, action) => {
        state.status = STATUSES.LOADING;
        
      })
      .addCase(fetchCartDetails.fulfilled, (state, action) => {
        state.data=action.payload;
        // state.data.push(action.payload);
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchCartDetails.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const fetchCartDetails = createAsyncThunk("cartslice", async () => {
  const email= "phargadeakshay@gmail.com"
  const res = await fetch(`${url}/getcartdata`, {
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

export const { removecart,increament,decreament,Addtocartlocal} = CartSlice.actions;
export default CartSlice.reducer;
