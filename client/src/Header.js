import styled from "styled-components";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useContext } from 'react';
import { FavoritesContext } from "./context/FavoritesContext";
import { UserContext } from "./context/UserContext";
import Login from "./Login";
import CreateAccount from "./CreateAccount";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
// TO DO: MAKE LOGIN LINK CONDITIONAL TO EITHER CREATE ACCOUNT OR LOGIN DEPENDING ON STATUS OF LOCAL STORAGE



const Header = () => {
    const [count, setCount] = useState(0);
    const {state} = useContext(FavoritesContext);
    const {userId} = useContext(UserContext);

    const { isAuthenticated } = useAuth0();

    // let currentUser = window.localStorage.getItem("userId");
    // console.log(currentUser);
    // console.log(currentUser.favorites);

    // let userId = (JSON.parse(localStorage.getItem("userId"))._id);
    // console.log(userId);
    return (
        <div>
            <Wrapper>
                <NavbarLink to={"/"}> Home</NavbarLink>
                
                <Dropdown>View all
                    <DropdownLink to={"/wines"}>Wines</DropdownLink>
                    <DropdownLink to={"/producers"}>Producers</DropdownLink>

                </Dropdown>
                {/* {
                state !== undefined ? 
                <NavbarLink to={"/favorites"}> My favorites ( {state.length} ) </NavbarLink>
                : <NavbarLink to={"/favorites"}> My favorites ( {count} ) </NavbarLink>
            } */}
                {/* <NavbarLink to={"/favorites"}> My Sips ( {count} )</NavbarLink>
                <NavbarLink to={"/profile"}>Profile </NavbarLink> */}

                <Dropdown>Browse by
                    <DropdownLink to={"/grapes"}>Grape</DropdownLink>
                    <DropdownLink to={"/colour"}>Colour</DropdownLink>
                    <DropdownLink to={"/regions"}>Place</DropdownLink>
                    <DropdownLink to={"/year"}>Year</DropdownLink>

                </Dropdown>
                {/* <RightNavbarLink to={"/signup"}> Login </RightNavbarLink> */}
                {/* {
                state !== undefined ? 
                // <NavbarLink to={"/favorites"}> My Sips ( {state.length} ) </NavbarLink>
                : <NavbarLink to={"/favorites"}> My Sips ( {count} ) </NavbarLink>
            } */}
            
            </Wrapper>
            <WrapperRight>

            <> {isAuthenticated === false ? <LoginButton/>: <LogoutButton/> }</>
            
            <NavbarLink to={`/favorites/${userId}`}> My favorites </NavbarLink>
            {/* <NavbarLink to={"/signup"}> Login </NavbarLink> */}
            </WrapperRight>
        </div>

    );
};


const Wrapper = styled.nav`
    width: 500px;
    display: flex;
    float: left;
    resize: vertical;
`;

const WrapperRight = styled.nav`
    margin-right: 40px;
    display: flex;
    float: right;
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