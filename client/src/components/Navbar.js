import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import WatchSearch from "./Search";

// import Searchbar from "./Searchbar";
// import logo from "./assets/logo.png";

const Navbar = ({ cartItemCount }) => {
  return (
    <>
      <NavWrapper>
        <NavLinkItem to="/">
          <img src="/chroneos.png" alt="" />
        </NavLinkItem>
        <WatchSearch />
        <NavLinkItem to="/">
          <h2>Home</h2>
        </NavLinkItem>
        <NavLinkItem to="/products">
          <h2>Products</h2>
        </NavLinkItem>
        <NavLinkItem to="/cart">
          <CartWrapper>
            <Cart />
            {cartItemCount > 0 && <ItemCount>{cartItemCount}</ItemCount>}
          </CartWrapper>
        </NavLinkItem>
      </NavWrapper>
    </>
  );
};

export default Navbar;
const Cart = styled(FaShoppingCart)`
  &:hover {
    color: var(--color-pumpkin);
  }
`;
const NavWrapper = styled.nav`
  display: flex;
  justify-content: space-evenly;
  padding: 10px 0px;
  margin-bottom: 25px;
  background-color: rgb(241, 241, 241);
  align-items: center;
  margin: 0;
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
const CartWrapper = styled.div`
  position: relative;
`;

const ItemCount = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  color: red;
  font-size: 16px;
  font-weight: bold;
`;
