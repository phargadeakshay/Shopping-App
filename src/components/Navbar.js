import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { atozshort, ztoashort, } from "../Slices/ProductListSlice";
const Navbar = () => {
  const dispatch = useDispatch();
  const [fliterrange, setFliteRrange] = useState(100);
  const [isVisible, setIsVisible] = useState(false);
  const SortProducts = (e) => {
    if (e.target.value === "a_z") {
      console.log(e.target.value, "rrrrrrrrrrrrrrrrrrrrr");
      dispatch(atozshort());
    } else if (e.target.value === "z_a") {
      dispatch(ztoashort());
    }
    else if (e.target.value === "lowtohigh") {
     
    }
    else if (e.target.value === "hightolow") {
    
    }
  };




const PriceFilter = (type)=>{
    // console.log(type,"__________________")
    // dispatch(PricefilterRange({fliterrange,type}))
    
}









console.log(fliterrange)
  const [navbar, setNavbar] = useState(false);
  return (
    <nav className="w-full bg-red-500 shadow">
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between py-3 md:py-3 md:block">
            <Link className="xxsm:text-sm text-2xl font-bold text-white" to="/">
              Logo
            </Link>
            <div className="md:hidden flex">
              <Link
                className="flex items-center hover:text-violet-500-200 px-4 py-2 text-white rounded-md shadow hover:bg-violet-500"
                to="/cart"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 md:inline-block"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </Link>
              <button
                className="p-2 text-gray-700 rounded-md outline-none "
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <h1>❌</h1>
                ) : (
                  <div className="flex items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              <li className="text-white hover:text-indigo-200">
                <Link to="/">Home</Link>
              </li>
              <li className="text-gray-600 hover:text-indigo-200 ">
                {/* <label htmlFor="" className="text-white mr-3">
                  Sorted By:
                </label> */}
                <select
                  name=""
                  id=""
                  className="w-56 rounded-lg h-8 border-none hover:text-gray-900 focus:outline-none"
                  onChange={SortProducts}
                >
                  <option value="">Sort Products</option>
                  <option value="a_z">A - Z</option>
                  <option value="z_a">Z - A</option>
                  <option value="lowtohigh">Price Low-High</option>
                  <option value="hightolow">Price High-Low</option>
               
                </select>
              </li>
              <li>
              <button id="myButton"  className="relative text-gray-500 font-semibold rounded-sm border p-1 w-40 bg-white" onClick={()=>setIsVisible(!isVisible)}>
        Show Value
      </button>
              {isVisible && (
        <div className="absolute z-10">
          <div className="w-40 h-30 p-2 bg-gray-100 flex justify-center items-center flex-col">
            <input
              type="range"
              min="100"
              max="5000"
              step="200"
              value={fliterrange}
              className="slider"
              id="myRange"
              onChange={(event) => setFliteRrange(event.target.value)}
            />
            <div>Price Range: {fliterrange}</div>
            <button className="p-1 bg-red-500 px-5 rounded-md" onClick={()=>PriceFilter("filter")}>Filter</button>
            <button className="p-1 bg-red-500 px-5 rounded-md" onClick={()=>PriceFilter("reset")}>reset</button>
          </div>
        </div>
      )}
              </li>
            </ul>
          </div>
        </div>
        <div className="hidden space-x-2 md:flex">
          <Link
            className="flex items-center hover:text-gray-200 px-4 py-2 text-white bg-red-700 rounded-md shadow hover:bg-gray-800 "
            to="/cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 md:inline-block"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
