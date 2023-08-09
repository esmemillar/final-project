import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        {/* </Wrapper> */}

        <List>
        <ul>
            {wine.filter(wineFiltered => wineFiltered.name.toLowerCase().includes(value.toLowerCase()) && value.length >= 2).map(wineFiltered => (
                    <ListItems 
                    key={wineFiltered._id}
                    onClick={() => handleSelect(wineFiltered._id)}>
                            <span>
                                {wineFiltered.name.slice(0, value.length)}
                                <Prediction>{wineFiltered.name.slice(value.length)}</Prediction>
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
padding: 10px;
margin-top: 30px;
height: 40px;
font-weight: bold;
color: #082A63;

&:active {
    color: #3C73CF;
}

&:hover {
    color: #3C73CF;
}

`;

const List = styled.div`
    position: absolute;
    margin-top: 70px;
    justify-content: center;
    margin-right: 70px;
`;

const ListItems = styled.div`
    padding: 10px;
    width: 300px;
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
