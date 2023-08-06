import styled from "styled-components";
import { useState } from "react";

const SearchBar = ({ wines, handleSelect }) => {
    const [value, setValue] = useState ('');

        let wine = wines.map(wine => {
            return {
                name: wine.name, 
                _id: wine._id
            }
        });


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
        </Wrapper>
        

        <List>
        <ul>
            {wine.filter(wineFiltered => wineFiltered.name.toLowerCase().includes(value.toLowerCase()) && value.length >= 2).map(wineFiltered => (
                    <ListItems 
                    key={wineFiltered._id}
                    onClick={() => handleSelect(wineFiltered.name)}>
                            <span>
                                {wineFiltered.name.slice(0, value.length)}
                                <Prediction>{wineFiltered.name.slice(value.length)} </Prediction>
                            </span>
                    </ListItems>
        ))}
        </ul>
        </List>
        </>
    );
} else {
    return <p>hold on... loading....</p>
}
};

const Wrapper = styled.div`
    display: flex;
    margin: 60px;
`;

const Input = styled.input`
    width: 300px;
    height: 50px;
    border-radius: 5px;
    margin: 25px;

`;

const Button = styled.button`
    background: blue;
    color: white;
    border-radius: 5px;
    width: 60px;
    height: 50px;
    margin-top: 25px;

`;

const List = styled.div`
    position: absolute;
    margin-top: 150px;
    justify-content: center;
`;

const ListItems = styled.div`
    padding: 10px;
    width: 500px;
    border-radius: 15px;


    &:hover {
        background: pink;
    }

    &:focus {
        background: blue;
    }
`;

const Prediction = styled.span`
    font-weight: bold;
`;


export default SearchBar;
