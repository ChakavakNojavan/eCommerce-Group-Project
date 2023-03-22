import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import Searchbar from "./Searchbar";
import logo from "./assets/logo.png";

const Navbar = () => {
  return (
    <NavWrapper>
      <NavbarLeft>
        <NavItem>
          <StyledLink to="/products">Products</StyledLink>
        </NavItem>
        <Searchbar />
      </NavbarLeft>
      <li>
        <StyledLink exact to="/">
          <StyledLogo src={logo} alt="logo" />
        </StyledLink>
      </li>
      <NavbarRight>
        <NavItem>
          <StyledLink exact to="/login">
            Account
          </StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink exact to="/cart">
            Cart
          </StyledLink>
        </NavItem>
      </NavbarRight>
    </NavWrapper>
  );
};

export default Navbar;

const NavWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  margin-bottom: 25px;
  background-color: #f1f1f1;
`;

const StyledLogo = styled.img`
  position: absolute;
  left: calc(50vw - 73px);
  top: 18px;
  height: 28px;
  z-index: 10;
`;

const NavItem = styled.li`
  .active {
    font-weight: bold;
    text-decoration: underline;
  }
  &:hover {
    text-decoration: underline;
  }
`;

const NavbarLeft = styled.div`
  display: flex;
  align-items: center;
`;

const NavbarRight = styled.div`
  display: flex;
  align-items: center;
`;

const StyledLink = styled(NavLink)`
  margin: auto 30px;
  color: #dadada;
`;
