

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
    <div className="bg-gray-200">
      <div className="container grid mx-auto md:col-start-1 md:col-end-6 md:col-span-4 bg-white">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:gap-9 pb-5  ">
          {productlistdata &&
            productlistdata.map((item, ind) => (
              <div
                className="w-full border shadow-xl mt-2 rounded-md "
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
                  <button  onClick={()=>AddToCart(item)} className="px-4 py-2 text-white  bg-pink-500 rounded-md shadow hover:bg-gray-800">Add to Cart</button>
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
