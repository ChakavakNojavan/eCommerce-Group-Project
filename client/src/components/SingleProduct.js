import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Loading from "./Loading";
import { FaShippingFast } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import { RiRefund2Line } from "react-icons/ri";

// SingleProduct function takes `cart` and `dispatch` as props
const SingleProduct = ({ cart, dispatch }) => {
  const { _id } = useParams();
  const [watch, setWatch] = useState();

  //this checks to see if an item is already in the cart, if it isn't in the cart it returns false,
  // if it is it returns, this helps with style rendering for the buttons and text in buttons
  const isItemInCart = (itemId) => {
    const foundItem = cart.find((item) => item._id === itemId);
    if (!foundItem) {
      return false;
    }
    return true;
  };
  // Fetching the single product data from the server
  useEffect(() => {
    fetch(`/api/products/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        setWatch(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [_id]);
  {
    /*This code handles the click when adding an item to the cart. 
    It prevents the default behavior of the event and sends a POST request to the API endpoint 
    to add the item to the cart. It then checks if the item already exists in the cart and 
    updates its quantity or adds it as a new item in the cart state accordingly. */
  }
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
        const existingCartItem = cart.find(
          (cartItem) => cartItem._id === data._id
        );
        if (existingCartItem) {
          dispatch({
            type: "UPDATE_QUANTITY",
            _id: item.id,
            quantity: data.quantity,
          });
        } else {
          dispatch({ type: "ADD_ITEM", item: data });
        }
      })
      .catch((error) => console.log(error));
  };
  // Render the SingleProduct component
  return (
    <div>
      {!watch ? (
        // if watch is falsy it will render the loading component. if it's truthy it will render the page
        <Loading />
      ) : (
        <Wrapper>
          <div>
            <WatchImg src={watch.imageSrc} />
          </div>

          <InfoSection>
            <WatchName>{watch.name}</WatchName>
            <Price>{watch.price}</Price>
            <Category>Category: {watch.category}</Category>
            <Description>
              Introducing the ultimate sports watch, designed for both
              adrenaline-seeking adventurers and dedicated athletes alike. This
              revolutionary timepiece combines an ultra-durable,
              scratch-resistant face with a lightweight, water-resistant case
              and band, ensuring it can endure the toughest conditions. Powered
              by cutting-edge solar technology and featuring advanced GPS,
              fitness tracking, and customizable sport modes, this watch is the
              perfect companion for any outdoor pursuit. Designed for style as
              well as functionality, the watch offers a variety of
              interchangeable bands and bezels, allowing you to personalize your
              timepiece to match your unique taste and personality. Elevate your
              performance and never miss a beat with this unparalleled
              accessory.
            </Description>
            <AddToCart
              // for this button, we're checking to see if there is the specified item in cart or
              // if there is no available stock to disable the button
              disabled={watch.numInStock <= 0 || isItemInCart(watch._id)}
              onClick={(e) => handleSubmit(e, watch)}
            >
              {/* making use of a ternary operator to render "out of stock" if there is no stock available
                    to render "Added to cart" if the item is already within the cart or else render "add to cart" */}
              {watch.numInStock <= 0
                ? "Out of Stock"
                : isItemInCart(watch._id)
                ? "Added to Cart"
                : "Add to Cart"}
            </AddToCart>
            <Info2>
              <Refund></Refund>
              <Info>
                <P>Easy Returns:</P>
                <p>this item can be returned within 30 days.</p>
              </Info>
            </Info2>
            <Info2>
              <Shipping></Shipping>
              <Info>
                <P>Shipping:</P>
                <p>All of our items ship from Canada.</p>
              </Info>
            </Info2>
            <Info2>
              <Call></Call>
              <Info>
                <P>Need help?</P>
                <p>
                  Call our CHRONEOS customer service team at +1 844 420 6969.
                </p>
              </Info>
            </Info2>
          </InfoSection>
        </Wrapper>
      )}
    </div>
  );
};

//styled components
const Category = styled.p`
  margin: 0;
  padding-bottom: 20px;
`;
const Description = styled.p`
  margin: 0;
  line-height: 1.5;
`;
const WatchImg = styled.img`
  height: 300px;
  width: auto;
  margin-right: 50px;
  margin-left: 200px;
  :hover {
    transform: scale(1.5);
  }
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-top: 50px;
  margin-right: 200px;
`;
const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const AddToCart = styled.button`
  align-items: center;
  background-color: #aa726c;
  color: white;
  border: 1px solid #dfdfdf;
  border-radius: 10px;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  font-family: Inter, sans-serif;
  font-size: 18px;
  justify-content: center;
  line-height: 28px;
  max-width: 100%;
  padding: 14px 22px;
  text-decoration: none;
  transition: all 0.2s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: 150px;
  margin-top: 20px;

  :active,
  :hover {
    outline: 0;
  }

  :hover {
    background-color: #aa726c;
    border-color: rgba(0, 0, 0, 0.19);
  }

  @media (min-width: 100px) {
    font-size: 20px;
    min-width: 200px;
    padding: 14px 16px;
  }
  &:disabled {
    opacity: 50%;
  }
`;
const Price = styled.h2`
  color: red;
  margin-bottom: 50px;
  font-size: 18px;
  font-weight: bold;
`;
const WatchName = styled.h2`
  margin-bottom: 40px;
  font-weight: 900;
  font-size: 24px;
`;
const P = styled.p`
  font-weight: 900;
  font-size: 18px;
  padding: 10px 0;
`;
const Shipping = styled(FaShippingFast)`
  font-size: 20px;
  margin-right: 10px;
  height: 30px;
  width: 30px;
  display: block;
  &:hover {
    color: var(--color-pumpkin);
  }
`;
const Call = styled(FiPhoneCall)`
  font-size: 20px;
  margin-right: 10px;
  height: 30px;
  width: 30px;
  display: block;
  &:hover {
    color: var(--color-pumpkin);
  }
`;
const Refund = styled(RiRefund2Line)`
  font-size: 20px;
  margin-right: 10px;
  height: 30px;
  width: 30px;
  display: block;
  &:hover {
    color: var(--color-pumpkin);
  }
`;
const Info = styled.div`
  flex: 1;
`;
const Info2 = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;
export default SingleProduct;
