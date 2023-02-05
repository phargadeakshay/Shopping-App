

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchproductdata } from "../Slices/ProductListSlice";

const ProductList = () => {

  const dispatch = useDispatch();
 

  const { data: productlistdata, status } = useSelector((state) => state.productlistdata);

  useEffect(() => {
    dispatch(fetchproductdata())
  }, []);

 console.log(productlistdata,"product list data")

  // }
  return (
    <div>Product page</div>
  );
};

export default ProductList;
