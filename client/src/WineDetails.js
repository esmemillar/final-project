import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";


const WineDetails = () => {
    const [wine, setWine] = useState([]);
    const params = useParams();
    const wineId = params.wineId;

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