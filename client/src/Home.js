import styled from "styled-components";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";




const Home = () => {

    const [wines, setWines] = useState([]);

    let navigate = useNavigate();

    useEffect(() => {
        fetch("/wines")
            .then((res) => res.json())
            .then((data) => {
                console.log(data.data);
                setWines(data.data);
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
                    <ul key ={wines._id}></ul>
                    <SearchBar 
                    wines={wines}
                    handleSelect={(wine) => {
                      console.log(wine);
                      navigate(`/wines/${wine}`);
                    }}
                    />
                    
            
                </Wrapper>
            )
                : (
                    <Wrapper>loading......</Wrapper>
                )}
        </>

    )
};



const Wrapper = styled.div`
    column-count: 3;
    text-align: center;
    margin-top: 60px;
`;



export default Home;