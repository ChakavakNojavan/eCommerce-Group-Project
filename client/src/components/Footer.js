import React from "react";
import styled from "styled-components";
import { Icon } from "react-icons-kit";
import { facebook } from "react-icons-kit/icomoon/facebook";
import { instagram } from "react-icons-kit/fa/instagram";
import { twitter } from "react-icons-kit/fa/twitter";
import { youtubePlay } from "react-icons-kit/fa/youtubePlay";
import { NavLink } from "react-router-dom";


//This code defines a functional component called Footer that returns 
//a styled container containing the company's title, contact information, 
//social media icons, and navigation links.
const Footer = () => {
  return (
    <Wrapper>
      <Title>CHRONEOS</Title>
      <TextContainer>
        <CompanyInfoContainer>
          <li>support@chroneos.com</li>
          <li>+1 844 420 6969</li>
          <li>7AM - 4PM, CET Mon - Fri</li>
        </CompanyInfoContainer>
        <Icons>
          <div>
            <Icon size={20} icon={facebook} />
          </div>
          <div>
            <Icon size={20} icon={instagram} />
          </div>
          <div>
            <Icon size={20} icon={twitter} />
          </div>
          <div>
            <Icon size={20} icon={youtubePlay} />
          </div>
        </Icons>
        <InfoContainer>
          <p>CHRONEOS</p>
          <NavLinks to="/about">
            <li>Our Story</li>
          </NavLinks>
          <NavLinks to="/affiliates">
            <li>Affiliates</li>
          </NavLinks>
        </InfoContainer>
      </TextContainer>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  margin-top: 200px;
  padding-left: 30px;
  padding-right: 30px;
`;

const CompanyInfoContainer = styled.div`
  list-style: none;
  li {
    padding: 7px;
  }
`;

const InfoContainer = styled.div`
  list-style: none;
  li:hover {
    cursor: pointer;
    color: var(--color-pumpkin);
  }
`;

const Title = styled.p`
  list-style: none;
  font-size: 40px;
`;

const Icons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
  width: 200px;

  & > *:hover {
    cursor: pointer;
    color: var(--color-pumpkin);
  }
`;

const NavLinks = styled(NavLink)`
  text-decoration: none;
`;

const TextContainer = styled.div`
  display: flex;
  justify-content: space-between;
  color: var(--color-charcoal);
`;
export default Footer;
