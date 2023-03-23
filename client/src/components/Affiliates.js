import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
        <div>
          <h2>Loading</h2>
        </div>
      ) : (
        <>
          <H2>All Brands</H2>
          <CompanyContainer>
            {companies.map((company) => (
              <IndividualCompany key={company._id}>
                <CompanyName>{company.name}</CompanyName>
                <p>{company.country}</p>
                <Link to={company.url}>
                  <p>{company.url}</p>
                </Link>
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
export default Affiliates;