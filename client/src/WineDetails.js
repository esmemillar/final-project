import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const WineDetails = () => {
    const [wine, setWine] = useState([]);
    const params = useParams();
    const wineId = params.wineId;

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

    return (
        <Wrapper>
            {wine.length !== 0 ? (
                <>
                <h1>Wine details</h1>
                <Wrapper>
                    <h3>{wine.name}</h3>
                    <p> $ {wine.price}</p>
                    <p>{wine.grape}</p>
                    <p>{wine.category}</p>
                    <p>{wine.notes}</p>
                    <>{wine.method}</>
                    <p>{wine.producer}</p>
                    <p>{wine.region}</p>
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
`;
const Image = styled.img`
    width: 200px;
    height: auto;
`;


export default WineDetails;