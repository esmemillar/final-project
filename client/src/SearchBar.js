import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ wines, handleSelect }) => {
    const [value, setValue] = useState ('');

        let wine = wines.map(wine => {
            return {
                name: wine.name, 
                _id: wine._id, 
                grapes: wine.grapes, 
                year: wine.year, 
                producer: wine.producer, 
                category: wine.category,
                notes: wine.notes,
                region: wine.region, 
                method: wine.method
            }
        });

        console.log(wine)

    if (wine !== undefined) {
    return (
        <>
        <Wrapper>
        <Input 
        type='text'
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
        onKeyDown={(ev) => {
            if (ev.key === 'Enter') {
                handleSelect(ev.target.value);
            }
        }}
         />
        <Button onClick={() => setValue('')}>Clear</Button>
        {/* </Wrapper> */}

        <List>
        <ul>
            {wine.filter(wineFiltered => (value.length >= 2) && ((wineFiltered.name.toLowerCase().includes(value.toLowerCase())) || (wineFiltered.notes.toLowerCase().includes(value.toLowerCase()) || (wineFiltered.producer.toLowerCase().includes(value.toLowerCase()) || (wineFiltered.grapes.toLowerCase().includes(value.toLowerCase())))))).map(wineFiltered => (
                    <ListItems 
                    key={wineFiltered._id}
                    onClick={() => handleSelect(wineFiltered._id)}>
                            <span>
                                {wineFiltered.name.slice(0, value.length)} 
                                <Prediction>{wineFiltered.name.slice(value.length)} </Prediction>
                                  {wineFiltered.year} - {wineFiltered.grapes}
                            </span>
                    </ListItems>
        ))}
        </ul>
        </List>
        </Wrapper>
        </>
    );
} else {
    return <p>hold on... loading....</p>
}
};

const Wrapper = styled.div`
    display: flex;
    margin: 20px;
    float: right;
`;

const Input = styled.input`
    width: 300px;
    height: 50px;
    border-radius: 5px;
    margin: 25px;

`;

const Button = styled.button`
text-decoration: none;
border: none;
padding: 10px;
margin-top: 30px;
height: 40px;
font-weight: bold;

border-radius: 10px;
background-color: pink;

&:active {
    color: #F61BF3;
}

&:hover {
    color: hot-pink;
}

`;

const List = styled.div`
    position: absolute;
    margin-top: 70px;
    margin-right: 30vw;
    margin-left: 30vw;
    float: left;
`;

const ListItems = styled.div`
    padding: 10px;
    width: 500px;
    border-radius: 10px;

    &:hover {
        background: pink;
    }
`;

const Prediction = styled.span`
    font-weight: bold;
`;


export default SearchBar;
