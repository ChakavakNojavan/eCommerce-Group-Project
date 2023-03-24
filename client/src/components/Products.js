import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

const Products = ({ updateCartItemCount }) => {
  const [watches, setWatches] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const [addedItems, setAddedItems] = useState(new Set());
  const isItemInCart = (itemId) => addedItems.has(itemId);

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
  const currentWatches = watches?.slice(indexOfFirstWatch, indexOfLastWatch);

  const handleSubmit = (event, item) => {
    event.preventDefault();
    event.stopPropagation();
    fetch(`/api/cart/${item._id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        const existingCartItem = cart.find(
          (cartItem) => cartItem._id === data._id
        );
        if (existingCartItem) {
          // If the item already exists in the cart, update its quantity
          existingCartItem.quantity = data.quantity;
        } else {
          // If the item is new, add it to the cart
          setCart([...cart, data]);
        }
        setAddedItems(new Set([...addedItems, data._id])); // Update addedItems state

        const newCartItemCount =
          cart.reduce((total, item) => total + item.quantity, 0) +
          data.quantity -
          (existingCartItem ? existingCartItem.quantity : 0);
        updateCartItemCount(newCartItemCount);
      })
      .catch((error) => console.log(error));
  };

  const handleClick = (event, watch) => {
    event.stopPropagation();
    navigate(`${watch._id}`);
  };

  return (
    <div>
      {!currentWatches ? (
        <div>
          <Loading />
        </div>
      ) : (
        <div>
          <Wrapper>
            {currentWatches.map((watch) => (
              <ProductWrapper
                key={watch._id}
                onClick={(e) => handleClick(e, watch)}
              >
                <div>
                  <ProductImg src={watch.imageSrc} alt="image of product" />
                </div>

                <ProductInfo>
                  <h4>{watch.name}</h4>
                  <p>{watch.price}</p>
                  <button
                    disabled={watch.numInStock === 0 || isItemInCart(watch._id)}
                    onClick={(e) => handleSubmit(e, watch)}
                  >
                    {watch.numInStock === 0
                      ? "Out of Stock"
                      : isItemInCart(watch._id)
                      ? "Added to Cart"
                      : "Add to Cart"}
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
              disabled={watches && currentWatches.length < watchesPerPage}
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
`;
const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 100vw;
`;
const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ProductImg = styled.img`
  height: 175px;
  width: auto;
  margin-top: 15px;
`;
const PageButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;

  button {
    margin: 0 5px;
  }
`;

export default Products;
