import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";





const Producers = () => {
    const [allProducers, setAllProducers] = useState("");
    

    let navigate = useNavigate();

    useEffect(() => {
        fetch("/producers")
            .then((res) => res.json())
            .then((data) => {
                console.log(data.data);
                setAllProducers(data.data);
            })
            .catch(error => {
                console.log("error")
            })
    }, []);

    return (

        <>
        <h1>Producers </h1>
        <Wrapper>
            {allProducers.length > 0 ? (
                allProducers.map((producer) => {
                    const handleClick = (e) => {
                        e.preventDefault();
    
                        navigate(`/producers/${producer._id}`);
                    }
                    return (
                        <ul key ={producer._id}>
                        <button onClick={handleClick}>{producer.name}</button>
                        <p>{producer.bio}</p>
    
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




export default Producers;
