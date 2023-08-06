import styled from "styled-components";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";




const Home = () => {

    const [wines, setWines] = useState("");

    useEffect(() => {
        fetch("/wines")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setWines(data.data);
                // console.log(wines);
            })
            .catch(error => {
                console.log("error");
              })
    }, []);



    return (

        <>
        <h1> home page slash login page </h1>
            {wines !== undefined ? (
                <Wrapper>
                    <li key ={wines._id}>{wines.name}</li>
                    
            
                </Wrapper>
            )
                : (
                    <Wrapper>loading......</Wrapper>
                )}
        </>

    )
}


const Wrapper = styled.div`
    column-count: 3;
    text-align: center;
    margin-top: 60px;
`;



export default Home;