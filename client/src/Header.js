import styled from "styled-components";
import { useState } from "react";
import { NavLink } from "react-router-dom";
// import { useContext } from 'react';
// import { CartContext } from "./context/CartContext";

const Header = () => {
    const [count, setCount] = useState(0);
    // const {state} = useContext(CartContext);

    return (
        <div>
            <Wrapper>
                <NavbarLink to={"/"}> Home</NavbarLink>
                
                <Dropdown>View all
                    <DropdownLink to={"/wines"}>Wines</DropdownLink>
                    <DropdownLink to={"/producers"}>Producers</DropdownLink>

                </Dropdown>

                <NavbarLink to={"/favorites"}> My Sips </NavbarLink>
                <NavbarLink to={"/profile"}>Profile </NavbarLink>

                <Dropdown>Browse by
                    <DropdownLink to={"/grapes"}>Grape</DropdownLink>
                    <DropdownLink to={"/styles"}>Style</DropdownLink>
                    <DropdownLink to={"/regions"}>Place</DropdownLink>

                </Dropdown>
                {/* {
                state !== undefined ? 
                // <NavbarLink to={"/favorites"}> My Sips ( {state.length} ) </NavbarLink>
                : <NavbarLink to={"/favorites"}> My Sips ( {count} ) </NavbarLink>
            } */}
            
            </Wrapper>
        </div>

    );
};


const Wrapper = styled.nav`
    width: 500px;
    display: flex;
    float: left;
    resize: vertical;
`;

const NavbarLink = styled(NavLink)`
    text-decoration: none;
    padding: 10px;
    font-weight: bold;
    color: #082A63;

    &:active {
        color: #3C73CF;
    }

    &:hover {
        color: #3C73CF;
    }
`;

const DropdownLink = styled(NavLink)`
    display: none;
`;

const Dropdown = styled.p`
text-decoration: none;
padding: 10px;
width: 100px;
font-weight: bold;
color: #082A63;
margin: 0;
cursor: pointer;
justify-content: center;


&:active {
    color: #3C73CF;
}

&:hover {
    color: #3C73CF;
}

&:hover ${DropdownLink} {
    display: inherit;
    color: #082A63;
    text-decoration: none;
    padding-top: 7px;
    cursor: pointer;

    &:hover {
        color: #3C73CF;
    }
}

`;


export default Header;