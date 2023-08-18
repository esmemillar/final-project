import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import { useAuth0 } from "@auth0/auth0-react";


const WineDetails = () => {
    const { user } = useAuth0();
    const [wine, setWine] = useState([]);
    const params = useParams();
    const wineId = params.wineId;
    const { setFavorites } = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/wines/${wineId}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data.data);
                setWine(data.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [wineId]);

        const handleClick = (e) => {
            e.preventDefault();
            navigate(`/producers/${wine.producerId}`);
        }
    
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

    return (
        <Wrapper>
            {wine.length !== 0 ? (
                <>
                <h1>Wine details</h1>
                <Wrapper>
                    <h3>{wine.name}</h3>
                    <p> $ {wine.price}</p>
                    <p><Bold>{wine.grapes}</Bold> from <Italic>{wine.region}</Italic></p>
                    <p>{wine.category}</p>
                    
                    <Container>
                    <p>{wine.notes}</p>
                    <p>{wine.method}</p>
                    </Container>
                    <Button onClick={handleClick}>{wine.producer}</Button>
                    <Image src={require (`${wine.imageSrc}`)} alt={wine._id} />
                    <Button onClick={() => addToFavorites(wine)}>Add to favorites!</Button>
                </Wrapper>
                </>
            )
                : (
                    <Wrapper>LOADING!</Wrapper>
                )}
        </Wrapper>

    )
};


const Wrapper = styled.div`
    margin: 80px;
`;
const Image = styled.img`
    width: 200px;
    height: auto;
`;

const Button = styled.button`
    cursor: pointer;
    margin: 15px;
    background-color: pink;
    padding: 10px;
    border: none;
`;

const Bold = styled.span`
    font-weight: bold;
`;

const Italic = styled.span`
    font-style: italic;
`;

const Container = styled.div`
    width: 60vw;
    text-align: justify;
    text-justify: inter-word;
`;
export default WineDetails;