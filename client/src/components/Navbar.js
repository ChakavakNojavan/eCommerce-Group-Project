import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

// import Searchbar from "./Searchbar";
// import logo from "./assets/logo.png";

const Navbar = () => {
  return (
    <>
      <NavWrapper>
        <NavLinkItem to="/">
          <img src="chroneos.png" alt="" />
        </NavLinkItem>
        <input type="text" />
        <NavLinkItem to="/">
          <h2>Home</h2>
        </NavLinkItem>
        <NavLinkItem to="/products">
          <h2>Products</h2>
        </NavLinkItem>
        <NavLinkItem to="/cart">
          <Cart />
        </NavLinkItem>
      </NavWrapper>
    </>
  );
};

export default Navbar;
const Cart = styled(FaShoppingCart)`
  &:hover {
    color: #fe7f2d;
  }
`;
const NavWrapper = styled.nav`
  display: flex;
  justify-content: space-evenly;
  padding: 10px 0px;
  margin-bottom: 25px;
  background-color: rgb(241, 241, 241);
  align-items: center;
`;

const NavLinkItem = styled(NavLink)`
  text-decoration: none;
  color: #233d4d;
  .active {
    font-weight: bold;
    text-decoration: underline;
  }
  &:hover {
    text-decoration: underline;
  }
`;
