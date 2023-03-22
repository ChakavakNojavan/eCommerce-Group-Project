import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./About";
import SingleProduct from "./SingleProduct"

const App = () => {
  return (
    //all the routes can change, I just put them as place holders, as well as the elements!
    <BrowserRouter>
      <Routes>
        <Route path="/" element="" />
        <Route path="/about" element={<About/>} />
        <Route path="/products" element="" />
        <Route path="/products/:_id" element={<SingleProduct/>} />
        <Route path="/cart" element="" />
        <Route path="" element={<h1>404: Oops!</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
