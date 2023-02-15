

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchproductdata } from "../Slices/ProductListSlice";
import { Addtocartlocal } from "../Slices/CartSlice";
import { fetchToCart } from "../Slices/AddToCartSlice";
import Swal from "sweetalert2";
const ProductList = () => {

  const dispatch = useDispatch();
 

  const { data: productlistdata, status } = useSelector((state) => state.productlistdata);

  useEffect(() => {
    dispatch(fetchproductdata())
  }, []);

 console.log(productlistdata,"product list data")

  const AddToCart = (item)=>{
    const cartdata = {
      imageurl: item.path,
      price: item.price,
      brand: item.brand,
      name: item.name,
      productid: item._id,
      quantity: 1,
      email:"phargadeakshay@gmail.com",
    };
    console.log(item,"zzzzzzzzzzz",cartdata)
//  dispatch(Addtocartlocal(cartdata))
 dispatch(fetchToCart(cartdata))
  }
  return (
    <div className="">
      <div className="container grid mx-auto md:col-start-1 md:col-end-6 md:col-span-4 bg-white">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:gap-9 pb-5  ">
          {productlistdata &&
            productlistdata.map((item, ind) => (
              <div
                className="w-full border shadow-xl mt-2 rounded-md hover:shadow-lg hover:scale-105 hover:bg-violet-100 transition-transform duration-300 ease-in-out  "
                key={ind}
                // onClick={() => handleClick(item._id)}
              >
                <a className="relative  rounded overflow-hidden  flex justify-center h-80">
                  <img
                    alt="ecommerce"
                    className="h-full w-full "
                    src={item.path}
                  />
                </a>
                <div className="mt-4 p-2">
                  <h3 className="text-gray-500 text-sm mb-1">
                    {item.color}
                  </h3>
                  <h2 className="text-gray-900 title-font uppercase text-base font-medium">
                    {item.name}
                  </h2>
                  <p className="mt-1"> &#8377;{item.price}</p>
                  <p className="pb-1">Free Delevery</p>
                  <button  onClick={()=>AddToCart(item)} className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4  focus:ring-purple-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Add to Cart</button>
                
                </div>
              </div>
            ))}
        </div>
      </div>
    {/* </section> */}
    </div>
  );
};

export default ProductList;
