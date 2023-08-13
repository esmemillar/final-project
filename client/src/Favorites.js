import { useContext, useEffect, useState } from "react";
import { FavoritesContext } from "./context/FavoritesContext";
import GlobalStyle from "./GlobalStyles";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";


// TO DO: LOGIN AND SAVE CURRENT USER IN LOCAL Storage, LINK USER ID TO MONGO DB DATABASE AND PUSH FAVORITES FOR EACH USER TO SAID DATABASE
const Favorites = ({ userId }) => {
    const {state, addToFavorites, deleteFromFavorites} = useContext(FavoritesContext);
    const navigate = useNavigate();

    console.log(userId);

    const [favorites, setFavorites] = useState([])

    const [favoritesId, setFavoritesId] = useState(null)

    const [favoritesUpdated, setFavoritesUpdated] = useState(false)


    useEffect(() => {
        if (state.length === 0) {
            const res = fetch('/favorites')
            const data = res.json()
            if (data.data[0] != undefined) {
                setFavorites(data.data[0].favorites)
                setFavoritesId(data.data[0]._id)
                setFavoritesUpdated(true)
            }  
        }
    }, [])


    useEffect(() => {
        if (favorites.length > 0) {
            favorites.forEach((wine) => {
                addToFavorites(wine)
            })
        }
    }, [favorites])




    const saveFavorites = async () => {
  
        try {
            await fetch(`/favorites/${favoritesId}`, {
                method: "DELETE"
            })
           
            await fetch('/favorites', {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(state)
            })
            setFavoritesUpdated(true)
        } catch (error) {
            console.log(error)
        }
    }

    // const clearFavorites = async () => {
    //     try {
    //         await fetch(`/favorites/${favoritesId}`, {
    //             method: "DELETE"
    //         })
            
    //         favorites.forEach((wine) => {
    //             deleteFromFavorites(wine)
    //         })
    //         setFavoritesUpdated(false)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    return(
        <><h1>Your Favorites</h1>
        <Wrapper>
            <div>
            <Container>
                {state.length === 0 ? <Empty>You have no saved sips</Empty> :
                <>
                    {state.map((wine, index) => {
                        return (
                        <ItemContainer key={wine._id} style={{borderBottom: index === state.length - 1 ? 0 : '1.5px solid lightgrey'}}>
                            {/* <ItemImage src={item.imageSrc} /> */}
                            <ItemInfo>
                                <ItemName>{wine.name} - {wine.grapes}</ItemName>
                                {/* {item.numInStock < 10 && <ItemStock>Only {item.numInStock} left in stock</ItemStock>} */}
                                <ItemPrice>$ {wine.price}</ItemPrice>
    
                            </ItemInfo>
                            <ItemButtons>
                                <DeleteButton onClick={() => deleteFromFavorites(wine)}>Remove from favorites</DeleteButton>
                            </ItemButtons>
                        </ItemContainer>
                        )
                    })}
                </>
                }
            </Container>
            </div>
            {state.length > 0 &&
            <CheckoutSection>
                <Container>
                    {/* <TotalAmount>Total: ${total}</TotalAmount> */}
                    {favoritesUpdated != true ? 
                        <SaveButton onClick={() => saveFavorites()}>Save favorites</SaveButton> :
                        <ClearCartButton>Clear favorites</ClearCartButton>}
                </Container>
            </CheckoutSection>
            }
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