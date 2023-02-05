import { Provider } from "react-redux";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import store from "./store/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./components/Cart";
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            {/* <Route path="/cart" element={<Cart/>}/> */}
            <Route path="/" element={ <ProductList/>}/> 
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
