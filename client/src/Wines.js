import styled from "styled-components";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";





const Wines = () => {
    const [allWines, setAllWines] = useState("");
    

    let navigate = useNavigate();



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
                        <button onClick={handleClick}>View details</button>
    
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



export default Wines;