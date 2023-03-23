import React from "react";
import styled from "styled-components";
import { Icon } from "react-icons-kit";
import { facebook } from "react-icons-kit/icomoon/facebook";
import { instagram } from "react-icons-kit/fa/instagram";
import { twitter } from "react-icons-kit/fa/twitter";
import { youtubePlay } from "react-icons-kit/fa/youtubePlay";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <Wrapper>
      <div>
        <CompanyInfoContainer>
          <CompanyTitle>
            <p>CHRONEOS</p>
          </CompanyTitle>
          <li>support@chroneos.com</li>
          <li>+1 844 420 6969</li>
          <li>7AM - 4PM, CET Mon - Fri</li>
          <Icons>
            <li>
              <Icon size={20} icon={facebook} />
            </li>
            <li>
              <Icon size={20} icon={instagram} />
            </li>
            <li>
              <Icon size={20} icon={twitter} />
            </li>
            <li>
              <Icon size={20} icon={youtubePlay} />
            </li>
          </Icons>
        </CompanyInfoContainer>
      </div>
      <div>
        <InfoContainer>
          <Title>
            <p>CHRONEOS</p>
          </Title>
          <NavLinks to="/about">
            <li>Our Story</li>
          </NavLinks>
          <NavLinks to="/affiliates">
            <li>Affiliates</li>
          </NavLinks>
        </InfoContainer>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 100px;
`;

const CompanyInfoContainer = styled.div`
  list-style: none;
  li {
    padding: 7px;
    color: #559ee1;
  }
`;

const InfoContainer = styled.div`
  list-style: none;
  text-align: right;
  li {
    padding: 7px;
    color: #559ee1;
  }
  li:hover {
    cursor: pointer;
    color: #fe7f2d;
  }
`;

const CompanyTitle = styled.div`
  list-style: none;
  padding: 10px;
  font-size: 18px;
  font-weight: 700;
  color: #233d4d;
`;

const Title = styled.div`
  list-style: none;
  padding: 10px;
  font-size: 20px;
  font-weight: 700;
  color: #233d4d;
`;

const Icons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  width: 200px;
  li :hover {
    cursor: pointer;
    color: #fe7f2d;
  }
`;

const NavLinks = styled(NavLink)`
  text-decoration: none;
`;

export default Footer;
