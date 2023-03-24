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
                  <p>{company.url}</p>
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
`;

const IndividualCompany = styled.div`
  width: 250px;
`;

const H2 = styled.h2`
  display: flex;
  justify-content: center;
`;

const CompanyName = styled.p`
  font-weight: bold;
`;

const Links = styled(Link)`
  color: var(--color-blue-gray);
`;
export default Affiliates;
