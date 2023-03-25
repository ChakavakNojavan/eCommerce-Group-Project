import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import WatchSearch from "./Search";

// Functional component to render navigation bar
const Navbar = ({ cartItemCount }) => {
  return (
    <>
      <NavWrapper>
        <NavLinkItem to="/">
          <img src="/chroneos.png" alt="" />
        </NavLinkItem>
        <WatchSearch />
        <NavLinkItem to="/">
          <H2>Home</H2>
        </NavLinkItem>
        <NavLinkItem to="/products">
          <H2>Products</H2>
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

// Styled components for navigation bar
const Cart = styled(FaShoppingCart)`
  font-size: 20px;
  &:hover {
    color: var(--color-pumpkin);
  }
`;

const H2 = styled.h2`
  :hover {
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
  font-size: 25px;

  .active {
    font-weight: bold;
  }
  &:hover {
    color: #aa726c;
  }
`;
const CartWrapper = styled.div`
  position: relative;
`;

const ItemCount = styled.span`
  position: absolute;
  top: -8px;
  right: 10px;
  color: white;
  background-color: red;
  border-radius: 50%;
  font-size: 14px;
  padding: 2px 5px;
  font-weight: bold;
`;
