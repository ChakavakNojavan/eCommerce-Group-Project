import "./styles.css";
import wtachtest from "/imgs/wtachtest.jpg"
import styled from "styled-components";

const SingleProduct = () => {
return (
    <Body>
    
    <Wrapper>

        <div>
            <WatchImg src={wtachtest} alt="watch test" /> 
        </div>

    <InfoSection>
        <h2>Product Name</h2>
        <Price>$20.00</Price>
        <p>This is the best watch on the market I promise you. It can even tell the time when you are asleep</p>
        <AddToCart>Add to cart</AddToCart>
    </InfoSection>
    
    </Wrapper>
    
    </Body>
)
}

const Body = styled.body`
height: 100vh;
margin: 0;
`;
const WatchImg = styled.img`
height: 500px;
width: auto;
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
const AddToCart =  styled.button`
max-width: 155px;
height: 50px;
font-size: 1.25em;
background-color: black;
color: white;
`
const Price =  styled.h2`
color: red
`





export default SingleProduct