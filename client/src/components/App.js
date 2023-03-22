import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./About";
import SingleProduct from "./SingleProduct";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { HomePage } from "./Homepage";
import { Products } from "./Products";
const App = () => {
  return (
    //all the routes can change, I just put them as place holders, as well as the elements!
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element="" />
        <Route path="/products/:_id" element={<SingleProduct />} />
        <Route path="/cart" element="" />
        <Route path="" element={<h1>404: Oops!</h1>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
