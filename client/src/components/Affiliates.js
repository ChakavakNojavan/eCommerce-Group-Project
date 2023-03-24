import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";

import styled from "styled-components";

const Affiliates = () => {
  const [companies, setCompanies] = useState();

  useEffect(() => {
    fetch("/api/companies")
      .then((response) => response.json())
      .then((data) => {
        setCompanies(data);
      });
  }, [setCompanies]);

  return (
    <>
      {!companies ? (
        <Loading />
      ) : (
        <>
          <H2>All Brands</H2>
          <CompanyContainer>
            {companies.map((company) => (
              <IndividualCompany key={company._id}>
                <CompanyName>{company.name}</CompanyName>
                <p>{company.country}</p>
                <Links to={company.url}>
                  <CompanyLink>{company.url}</CompanyLink>
                </Links>
              </IndividualCompany>
            ))}
          </CompanyContainer>
        </>
      )}
    </>
  );
};

const CompanyContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 30px;
`;

const IndividualCompany = styled.div`
  width: 250px;
`;

const H2 = styled.h2`
  display: flex;
  justify-content: center;
  font-size: 40px;
  margin-top: 30px;
  margin-bottom: 40px;
`;

const CompanyName = styled.p`
  font-size: 20px;
`;

const Links = styled(Link)`
  text-decoration: none;
`;

const CompanyLink = styled.p`
  color: var(--color-blue-gray);
  :hover {
    color: var(--color-pumpkin);
  }
`;
export default Affiliates;
