import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    //all the routes can change, I just put them as place holders, as well as the elements!
    <BrowserRouter>
      <Routes>
        <Route path="/" element="" />
        <Route path="/about" element="" />
        <Route path="/products" element="" />
        <Route path="/products/:_id" element="" />
        <Route path="/cart" element="" />
        <Route path="" element={<h1>404: Oops!</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
