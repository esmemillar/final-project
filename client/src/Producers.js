import styled from "styled-components";
import { useEffect, useState } from "react";





const Producers = () => {
    const [allProducers, setAllProducers] = useState("");
    

    // let navigate = useNavigate();



    useEffect(() => {
        fetch("/producers")
            .then((res) => res.json())
            .then((data) => {
                console.log(data.data);
                setAllProducers(data.data[0]);
            })
            .catch(error => {
                console.log("error")
            })
    }, []);

    return (

        <>
        <h1>Producers page </h1>
            {allProducers !== undefined ? (
                <Wrapper>
                    <li key ={allProducers._id}>
                        <p>{allProducers.name}</p>
                        <p>{allProducers.bio}</p>
                    </li>
              
                </Wrapper>
            )
                : (
                    <Wrapper>loading......</Wrapper>
                )}
        </>

    )
};

const Wrapper = styled.div`
`;




export default Producers;