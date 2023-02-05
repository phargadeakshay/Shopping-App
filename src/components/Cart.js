import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCartDetails } from "../Slices/CartSlice";
import { useEffect, useState } from "react";
import { removecart, increament, decreament } from "../Slices/CartSlice";
import axios from "axios";
import { STATUSES } from "../Slices/CartSlice";
import Loading from "react-loading";
const Cart = () => {
  const [coupon, setCoupon] = useState("");
  const [couponresdata, setCouponresdata] = useState("");
  // console.log(coupon,"cccssssssssssssssk")
  const dispatch = useDispatch();
  const { data: cartdata, status } = useSelector((state) => state.cartdata);
  // // console.log(cartdata,"LLLL")
  useEffect(() => {
    dispatch(fetchCartDetails());
  }, []);
  console.log(cartdata, "LLLL");

  const updateCart = (quantity, id, price) => {
    // dispatch(fetchToCart(updateddata));
  };

  const increamentt = (id) => {
    dispatch(increament(id));
  };
  const decreamentt = (id, quan) => {
    if (quan > 1) {
      dispatch(decreament(id));
    } else {
      DeleteItem(id);
      dispatch(removecart(id));
    }
  };
  //   const token = localStorage.getItem("loginusertoken");

  const DeleteItem = (id) => {
    dispatch(removecart(id));
  };

  var sutotal = 0;
  var mul = 1;
  var sum = 0;
  const totalPrice = () => {
    sum = parseFloat(sum);
    mul = parseFloat(mul);
    sutotal = parseFloat(sutotal);

    if (cartdata && typeof cartdata != "string") {
      let updatedItemVal = cartdata.reduce((initialVal, curElem) => {
        let { quantity, price, total } = curElem;

        mul = price * quantity;
        sum = sum + mul;
        sutotal = sum;
      }, 1);
      if (couponresdata && couponresdata.status === 200) {
        sum -= couponresdata.data.discount;
        // console.log(sutotal,"------------------subtotal-----------")
      }
    }
  };
  totalPrice();
  // console.log(sutotal,sum,"------------------sum-----------")
  const CheckCouponCode = async () => {
    await axios
      .post(`https://ecommerstore.onrender.com/verifycoupon`, {
        headers: {
          "Content-Type": "application/json",
        },
        coupon,
      })
      .then((res) => {
        setCouponresdata(res);

        console.log(res, "11111111111", couponresdata.status);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // // console.log(localStorage.getItem("email1"))

  if (status === STATUSES.LOADING) {
    return (
      <div className="flex justify-center">
        {" "}
        <Loading type="bubbles" color="#ff0000" height={667} width={375} />
      </div>
    );
  }
  if (status === STATUSES.ERROR) {
    return <h2>something went wrong..!</h2>;
  }
  return (
    <div>
      <div className="container p-8 mx-auto mt-12">
        <div className="w-full overflow-x-auto">
          <div className="my-2">
            <h3 className="text-xl font-bold tracking-wider">
              Shopping Cart item
            </h3>
          </div>
          <table className="w-full shadow-inner">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-2 py-3 font-bold whitespace-nowrap">Image</th>
                <th className="px-2 py-3 font-bold whitespace-nowrap">
                  Product Name
                </th>
                <th className="px-2 py-3 font-bold whitespace-nowrap">Size</th>
                <th className="px-2 py-3 font-bold whitespace-nowrap">Qty</th>
                <th className="px-2 py-3 font-bold whitespace-nowrap">Price</th>
                <th className="px-2 py-3 font-bold whitespace-nowrap">Total</th>
                <th className="px-2 py-3 font-bold whitespace-nowrap">
                  Remove
                </th>
              </tr>
            </thead>
            <tbody className="">
              {Array.isArray(cartdata) ? (
                cartdata &&
                cartdata.map((item, ind) => (
                  <tr key={ind}>
                    <td>
                      <div className="flex justify-center">
                        <img
                          src={item.imageurl}
                          className="object-cover h-28 w-28 rounded-2xl"
                        />
                      </div>
                    </td>
                    <td className="p-4 px-2 text-center whitespace-nowrap">
                      {item.brand}
                      <span className="p-2">{item.name}</span>
                    </td>
                    <td className="p-4 px-2 text-center whitespace-nowrap">
                      Size M
                    </td>
                    <td className="p-4 px-2 text-center whitespace-nowrap">
                      <div>
                        <button
                          onClick={() => {
                            updateCart(item.quantity - 1, item._id, item.price);
                            decreamentt(item._id, item.quantity);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="inline-flex w-6 h-6 text-red-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </button>
                        <span className="p-3">{item.quantity}</span>
                        <button
                          onClick={() => {
                            updateCart(item.quantity + 1, item._id, item.price);
                            increamentt(item._id);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="inline-flex w-6 h-6 text-green-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="p-4 px-2 text-center whitespace-nowrap">
                      &#8377;{item.price}
                    </td>
                    <td className="p-4 px-2 text-center whitespace-nowrap">
                      &#8377;{item.price * item.quantity}
                    </td>
                    <td className="p-4 px-2 text-center whitespace-nowrap">
                      <button onClick={() => DeleteItem(item._id)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6 text-red-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="flex justify-center">
                  <td>{cartdata}</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="lg:w-2/4">
            <div className="mt-4">
              <div className="px-4 py-4 rounded-md">
                <label
                  htmlFor="coupon code"
                  className="font-semibold text-gray-600"
                >
                  Coupon Code
                </label>
                <input
                  type="text"
                  placeholder="coupon code mm7a710sm  this free coupon"
                //   value="mm7a710sm"
                  onChange={(e) => setCoupon(e.target.value)}
                  className="
                w-full
                px-2
                py-2
                border border-blue-600
                rounded-md
                outline-none
              "
                />
                {couponresdata &&
                  (couponresdata.status === 200 ? (
                    <span className="block text-green-600">
                      {couponresdata.data.smg}
                    </span>
                  ) : (
                    <span className="block text-red-600">
                      {couponresdata.data.smg}
                    </span>
                  ))}
                <button
                  onClick={CheckCouponCode}
                  className="
                px-2
                py-2
                mt-2
                text-sm text-indigo-100
                bg-indigo-600
                rounded-md
                hover:bg-indigo-700
              "
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="py-4 rounded-md shadow">
              <h3 className="text-xl font-bold text-blue-600">Order Summary</h3>
              <div className="flex justify-between px-4">
                <span className="font-bold">Subtotal</span>
                <span className="font-bold">&#8377;{sutotal}</span>
              </div>
              <div className="flex justify-between px-4">
                <span className="font-bold">Discount</span>
                <span className="font-bold text-red-600">
                  - &#8377;
                  {couponresdata &&
                    (couponresdata.data.discount ? (
                      <span>{couponresdata.data.discount}</span>
                    ) : (
                      <span>00</span>
                    ))}
                </span>
                {/* {!couponresdata && <span className="font-bold text-red-600">00</span>} */}
              </div>
              <div className="flex justify-between px-4">
                <span className="font-bold">Sales Tax</span>
                <span className="font-bold">&#8377;00</span>
              </div>
              <div
                className="
              flex
              items-center
              justify-between
              px-4
              py-2
              mt-3
              border-t-2
            "
              >
                <span className="text-xl font-bold">Total</span>
                <span className="text-2xl font-bold">&#8377;{sum}</span>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <button
              className="
            w-full
            py-2
            text-center text-white
            bg-blue-500
            rounded-md
            shadow
            hover:bg-blue-600
          "
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
        {/* // pppppppppppppppp */}
      </div>
    </div>
  );
};

export default Cart;
