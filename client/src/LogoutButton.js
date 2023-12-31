import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      LOG OUT
    </Button>
  );
};

const Button = styled.button`
    text-decoration: none;
    background: none;
    border: none;
    padding: 10px;
    font-weight: bold;
    color: #082A63;

    &:active {
        color: #474C8C;
    }

    &:hover {
        color: #474C8C;
    }
`;

export default LogoutButton;