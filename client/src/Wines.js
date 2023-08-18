import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { FavoritesContext } from "./context/FavoritesContext";

import { useNavigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import { useAuth0 } from "@auth0/auth0-react";



const Wines = () => {
    const { user } = useAuth0();
    const [allWines, setAllWines] = useState("");
    // const {state, addToFavorites } = useContext(FavoritesContext);
    const { AddToFavorites, favorites, setFavorites } = useContext(UserContext);
    // const {state, addToFavorites } = useContext(FavoritesContext);

    let navigate = useNavigate();

    const addToFavorites = ( wine ) => {
        debugger
            fetch('/favorites', {
                method: 'PATCH', 
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }, 
                body: JSON.stringify({ updatedFavorite: wine, _id: JSON.parse(localStorage.getItem("userId"))._id, user: user })
            })
            .then(res => res.json())
            .then((data) => {
                setFavorites(data.data);
                console.log(data.data);
            })
    }

    useEffect(() => {
        fetch("/wines")
            .then((res) => res.json())
            .then((data) => {
                console.log(data.data);
                setAllWines(data.data);
            })
            .catch(error => {
                console.log("error")
            })
    }, []);



    return (

        <>
        <h1>Wines page </h1>
        <Wrapper>
            {allWines.length > 0 ? (
                allWines.map((wine) => {
                    const handleClick = (e) => {
                        e.preventDefault();

                        navigate(`/wines/${wine._id}`);
                    }
                    return (
                        <ul key ={wine._id}>
                        <p>{wine.name}</p>
                        <p>{wine.producer}</p>
                        <p>$ {wine.price}</p>
                        <Button onClick={handleClick}>View details</Button>
                        <Button onClick={() => addToFavorites(wine)}>Add to favorites!</Button>
    
                        <Image src={require (`${wine.imageSrc}`)} alt={wine._id} />

                    </ul>
                    )
                })
            )
                : (
                    <Wrapper>loading......</Wrapper>
                )}
                </Wrapper>
        </>

    )
};

const Wrapper = styled.div`
`;

const Image = styled.img`
    width: 200px;
    height: auto;
`;

const Button = styled.button`
text-decoration: none;
padding: 10px;
font-weight: bold;
color: #082A63;

&:active {
    color: #3C73CF;
}

&:hover {
    color: #3C73CF;
}
`;



export default Wines;