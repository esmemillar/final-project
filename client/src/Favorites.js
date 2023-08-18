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
                console.log(data.data);
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
        <h1>Your favorites</h1>
        <Wrapper>
            {justFavorites !== undefined ? (
                justFavorites.map((wine) => {
                    return (
                        <ul key ={wine._id}>
                        <p>{wine.name}</p>
                        <p>{wine.producer}</p>
                        <p>$ {wine.price}</p>
                        </ul>
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
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 100vw;
    gap: 30px;
    margin-top: 80px;
`

const CheckoutSection = styled.div`
    display: flex;
`

const PageTitle = styled.h1`
    display: flex;
    margin: auto;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: 15px;
`

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