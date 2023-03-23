import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Loading from "./Loading";


const SingleProduct = () => {
    const {_id} = useParams()
    const [watch, setWatch] =  useState()
    const [cart, setCart] = useState([]);

    useEffect( () => {
        fetch(`/api/products/${_id}`)
            .then(res => res.json())
            .then( (data) => {
                setWatch(data)
                console.log(data)
            })
            .catch( (error) => {
                console.log(error)
            })
    }, [])

const handleSubmit = (event, item) => {
    event.preventDefault();
    event.stopPropagation();
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
        {!watch
        ?(<Loading/>)
        :(
            <Wrapper>

        <div>
            <WatchImg src={watch.imageSrc}/>
        </div>

    <InfoSection>
        <WatchName>{watch.name}</WatchName>
        <Price>{watch.price}</Price>
        <Stock>Stock: {watch.numInStock}</Stock>
        <Category>Category: {watch.category}</Category>
        <p>This is the best watch on the market I promise you. It can even tell the time when you are asleep</p>
        <AddToCart
        disabled={watch.numInStock === 0} 
        onClick={(e) => handleSubmit(e, watch)}>
        Add to cart
        </AddToCart>
    </InfoSection>
    
    </Wrapper>
        )}
    </div>
    
)
}

const Stock = styled.p`
margin:0;
`
const Category = styled.p`
margin:0;
`
const Description = styled.p`
margin: 0;
`
const WatchImg = styled.img`
height: 500px;
width: auto;
border: solid black 1px;
margin-right: 50px;
border-radius: 30px;
:hover {
    transform: scale(1.5);
}
`
const Wrapper = styled.div`
display: flex;
align-items: center;
justify-content: center;
height: 100%;

`
const InfoSection = styled.div`
display: flex;
flex-direction: column;
justify-content: center
`
const AddToCart = styled.button`
align-items: center;
background-color: rgba(240, 240, 240, 0.26);
border: 1px solid #DFDFDF;
border-radius: 16px;
box-sizing: border-box;
color: #000000;
cursor: pointer;
display: flex;
font-family: Inter, sans-serif;
font-size: 18px;
justify-content: center;
line-height: 28px;
max-width: 100%;
padding: 14px 22px;
text-decoration: none;
transition: all .2s;
user-select: none;
-webkit-user-select: none;
touch-action: manipulation;
width: 150px;


:active,
:hover {
outline: 0;
}

:hover {
background-color: #FFFFFF;
border-color: rgba(0, 0, 0, 0.19);
}

@media (min-width: 100px) 
{
    font-size: 20px;
    min-width: 200px;
    padding: 14px 16px;
}
`
const Price = styled.h2`
color: red;
margin-bottom: 50px;
`
const WatchName = styled.h2`
margin-bottom: 40px;
` 


export default SingleProduct;