import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProducerDetails = () => {
    // const [producerDetail, setProducerDetail] = useState([]);
    const [producer, setProducer] = useState([]);
    const [wines, setWines] = useState([]);
    const navigate = useNavigate();
    const params = useParams();
    const producerId = params.producerId;


    const handleClick = (e, matchingWine) => {
        navigate(`/wines/${matchingWine._id}`)
    };


    useEffect(() => {
        fetch(`/producers/${producerId}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data.data);
                setProducer(data.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [producerId]);

    useEffect(() => {
        fetch("/wines")
            .then((res) => res.json())
            .then((data) => {
                setWines(data.data);
            })
            .catch(error => {
                console.log(error)
            })
    }, []);

    console.log(producer);
    const producerDetailId = producer._id;

    const matchingWines = [];
    for (let i = 0; i < wines.length; i++) {
        if (wines[i].producerId === producerDetailId) {
            matchingWines.push(wines[i]);
        }
    }

    console.log(producer);

    return (
        <Wrapper>
            {producer !== undefined ? (
                <Wrapper>
                    <h1>{producer.producer}</h1>
                    <Wrapper>
                        <h3>{producer.name}</h3>
                        <h3>{producer.region}</h3>
                        <Container>
                            <p>{producer.bio}</p>
                        </Container>

                    </Wrapper>
                    <Wrapper>

                        {matchingWines.length > 0 ? (
                            matchingWines.map((matchingWine) => {
                                return <Wrapper key={matchingWine._id}>
                                    <Span>
                                        <p>{matchingWine.name} - {matchingWine.grapes}</p>
                                        <Button onClick={(e) => handleClick(e, matchingWine)}>View details</Button>
                                    </Span>
                                </Wrapper>

                            })
                        )
                            : (
                                <Wrapper>LOOOOOOADING!!!!!!!</Wrapper>
                            )}
                    </Wrapper>


                </Wrapper>
            )
                : (
                    <Wrapper>LOOOOOOADING!!!!!!!</Wrapper>
                )}
        </Wrapper>

    )
};

const Wrapper = styled.div`
    margin: 80px;
`;

const Button = styled.button`
    cursor: pointer;
    margin: 15px;
    background-color: pink;
    padding: 10px;
    border: none;
`;

const Span = styled.span`
display: inline-flex;
`;

const Container = styled.div`
    width: 60vw;
    text-align: justify;
    text-justify: inter-word;
`;

export default ProducerDetails;