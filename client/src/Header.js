import styled from "styled-components";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useContext } from 'react';
// import { FavoritesContext } from "./context/FavoritesContext";
import { UserContext } from "./context/UserContext";
import Login from "./Login";
import CreateAccount from "./CreateAccount";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
// TO DO: MAKE LOGIN LINK CONDITIONAL TO EITHER CREATE ACCOUNT OR LOGIN DEPENDING ON STATUS OF LOCAL STORAGE



const Header = () => {
    // const [count, setCount] = useState(0);
    // const {state} = useContext(FavoritesContext);
    const {userId} = useContext(UserContext);

    const { isAuthenticated } = useAuth0();
    // console.log(userId);

    let currentUser = window.localStorage.getItem("userId");
    
    // if (isAuthenticated === true) {
    //     let count = (JSON.parse(currentUser).favorites).length;
    // } else {
    //     let count = undefined
    // }
    // const count = (JSON.parse(currentUser).favorites).length;
    console.log((JSON.parse(currentUser).favorites).length);

    // let userId = (JSON.parse(localStorage.getItem("userId"))._id);
    // console.log(userId);
    return (
        <Banner>
            <Wrapper>
                <NavbarLink to={"/"}> HOME</NavbarLink>
                
                <Dropdown>VIEW ALL
                    <DropdownLink to={"/wines"}>WINES</DropdownLink>
                    <DropdownLink to={"/producers"}>PRODUCERS</DropdownLink>

                </Dropdown>

                {/* <Dropdown>Browse by
                    <DropdownLink to={"/grapes"}>Grape</DropdownLink>
                    <DropdownLink to={"/colour"}>Colour</DropdownLink>
                    <DropdownLink to={"/regions"}>Place</DropdownLink>
                    <DropdownLink to={"/year"}>Year</DropdownLink>

                </Dropdown> */}
                <> {isAuthenticated === false ? <></> :  <NavbarLink to={`/favorites/${userId}`}> MY FAVORITES </NavbarLink> }</>
                {/* <RightNavbarLink to={"/signup"}> Login </RightNavbarLink> */}
                {/* {
                state !== undefined ? 
                // <NavbarLink to={"/favorites"}> My Sips ( {state.length} ) </NavbarLink>
                : <NavbarLink to={"/favorites"}> My Sips ( {count} ) </NavbarLink>
            } */}
            
            </Wrapper>
            <WrapperRight>  
            {/* <> {isAuthenticated === false ? <></> :  <NavbarLink to={`/favorites/${userId}`}> My favorites </NavbarLink> }</>           */}
            {/* <NavbarLink to={`/favorites/${userId}`}> My favorites </NavbarLink> */}
            {/* <NavbarLink to={"/signup"}> Login </NavbarLink> */}
            <> {isAuthenticated === false ? <LoginButton/>:  <LogoutButton/> }</>
            </WrapperRight>
        </Banner>

    );
};

const Banner = styled.div`
    display: flex;
    width: 100vw;
    height: 80px;
    // background-color: #747694;
`;

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
    position: absolute;
    top: 5px;
    right: 5px;
`;

const NavbarLink = styled(NavLink)`
    text-decoration: none;
    padding: 10px;
    font-weight: bold;
    color: #082A63;

    &:active {
        color: #474C8C;
        text-decoration: underline;
    }

    &:hover {
        color: #474C8C;
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
    color: #474C8C;
}

&:hover {
    color: #474C8C;
}

&:hover ${DropdownLink} {
    display: inherit;
    color: #082A63;
    text-decoration: none;
    padding-top: 7px;
    cursor: pointer;

    &:hover {
        color: #474C8C;
    }
}

`;


export default Header;