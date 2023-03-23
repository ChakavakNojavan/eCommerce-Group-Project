import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const Products = () => {
  const [watches, setWatches] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [cart, setCart] = useState([]);
  

  useEffect(() => {
    fetch(`/api/products`)
      .then((res) => res.json())
      .then((data) => {
        setWatches(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const watchesPerPage = 48;
  const indexOfLastWatch = currentPage * watchesPerPage;
  const indexOfFirstWatch = indexOfLastWatch - watchesPerPage;
  const currentWatches = watches?.slice(
    indexOfFirstWatch,
    indexOfLastWatch
  );

  const handleSubmit = (event, item) => {
    event.preventDefault();
    fetch(`/api/cart/${item._id}`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    //   body: JSON.stringify(item),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setCart([...cart, data]);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      {!currentWatches ? (
        <div>LOADING ICON</div>
      ) : (
        <div>
          <Wrapper>
            {currentWatches.map((watch) => (
              <ProductWrapper key={watch._id}>
                <div>
                  <ProductImg
                    src={watch.imageSrc}
                    alt="image of product"
                  />
                </div>

                <ProductInfo>
                  <h4>{watch.name}</h4>
                  <p>{watch.price}</p>
                  <button onClick={(e) => handleSubmit(e, watch)}>
                    Add to Cart
                  </button>
                </ProductInfo>
              </ProductWrapper>
            ))}
          </Wrapper>
          <PageButtons>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Prev
            </button>

            <button
              disabled={
                watches && currentWatches.length < watchesPerPage
              }
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </PageButtons>
        </div>
      )}
    </div>
  );
};

const ProductWrapper = styled.div`
width: 25%;
display: flex;
flex-direction: column;
align-items: center;
border: solid black 2px;
`
const Wrapper = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
max-width: 100vw;
`
const ProductInfo = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`
const ProductImg = styled.img`
height: 175px;
width: auto;
margin-top: 15px;
`
const PageButtons = styled.div`
display: flex;
justify-content: center;
margin-top: 10px;

button {
    margin: 0 5px;
}
`;

export default Products;