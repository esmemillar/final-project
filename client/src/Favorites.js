import { useContext, useEffect, useState } from "react";
import { FavoritesContext } from "./context/FavoritesContext";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";


// TO DO: SHOULD PUSH "FAVORITES" TO CURRENTUSER.FAVORITES ARRAY IN MONGODB DATABSE AND THEN RETURN CONTENTS OF THAT ARRAY 
const Favorites = () => {
    // const {state, addToFavorites, deleteFromFavorites} = useContext(FavoritesContext);
    
    const navigate = useNavigate();
    const params = useParams();
    const userId = params.userId;

    let currentUser = window.localStorage.getItem("userId");
    // console.log(currentUser);
    // console.log(currentUser.favorites);

    const [favorites, setFavorites] = useState([])

    // const [favoritesId, setFavoritesId] = useState(null)

    // const [favoritesUpdated, setFavoritesUpdated] = useState(false)


    useEffect(() => {
        fetch(`/favorites/${userId}`)
            .then((res) => res.json())
            .then((data) => {
                // console.log(data.data);
                setFavorites(data.data);
            }) 
            .catch(error => {
                console.log(error)
            })
    }, [userId]);

    let justFavorites = favorites.favorites;
    console.log(justFavorites)

    return (
        <>
  
        <Wrapper>
            {justFavorites !== undefined ? (
                justFavorites.map((wine) => {
                    const handleClick = (e) => {
                        e.preventDefault();

                        navigate(`/wines/${wine._id}`);
                    }
                    const handleClickProducer = (e) => {
                        e.preventDefault();

                        navigate(`/producers/${wine.producerId}`)
                    }
                    return (
                        <Box key ={wine._id}>
                        <TextBox>
                        <Name onClick={handleClickProducer}>{wine.producer}</Name>
                        <p>{wine.name}  ${wine.price}</p>
                        </TextBox>
                        <Image src={require (`${wine.imageSrc}`)} alt={wine._id} />
                        <ButtonsBox>
                        <Button onClick={handleClick}>View details</Button>
                        </ButtonsBox>
                        </Box>
                    )
                })
            )
            : (
                <Wrapper>loading.....</Wrapper>
            )}
        </Wrapper>
        </>
 
    )

};

const Wrapper = styled.div`
column-count: 3;
margin-top: 80px;

display: grid;
grid-template-columns: 30vw 30vw 30vw;
margin-left: 5vw;
`
const TextBox = styled.span`
    text-align: center;
    display: inline;
`;

const Producer = styled.p`
`;

const Name = styled.button`
text-decoration: none;
padding-top: 15px;
font-weight: bold;
font-size: 16px;
border: none;
background-color: transparent;

&:hover {
    color: #474C8C;
}
`;

const Box = styled.div`
display: grid;
grid-template-columns: 30vw 30vw 30vw;
margin: 10px;
border: 1px solid black;
position: relative;
height: 500px;
`;

const Image = styled.img`
width: 200px;
height: auto;
align-items: center;
position: absolute;
bottom: 0;
left: 0;
`;

const Button = styled.button`
text-decoration: none;
border: none;
padding: 10px;

height: 40px;
cursor: pointer;

&:hover {
    background-color: #ABAEE9;
}

`;

const ButtonsBox = styled.div`
position: absolute;
left: 170px;
top: 84px;
display: flex-wrap;

`;

const Container = styled.div`
    display: flex;
    border: 1px solid black;
    max-width: 80vw;
    width: 70vw;
    flex-direction: column;
    padding: 10px;
`;

const Empty = styled.p`
`;

const ItemContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: auto;
    gap: 5px;
    padding: 30px 10px;
`;

const ItemInfo = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const ItemImage = styled.img`
    width: 150px;
`;

const ItemName = styled.h3`
    margin-bottom: 5px;
    margin-top: 0;
`;

const ItemPrice = styled.p`
    font-size: 1.3em;
    font-weight: bold;
    margin: 15px 0;
`;


const ItemButtons = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 150px;
`;

const DeleteButton = styled.button`
cursor: pointer;
margin: 15px;
background-color: pink;
padding: 10px;
border: none;
`;

const SaveButton = styled.button`
    cursor: pointer;
    margin: 15px;
    background-color: pink;
    padding: 10px;
    border: none;
`;

const ClearCartButton = styled.button`
    cursor: pointer;
    margin: 15px;
    background-color: pink;
    padding: 10px;
    border: none;
`;


const TotalAmount = styled.h4`
    font-size: 1.2em;
    margin: 20px 10px;
`;

const CheckoutButton = styled.button`
    background-color: lightblue;
    font-weight: bold;
    cursor: pointer;
`;

export default Favorites;