import { createContext, useReducer, useState } from "react";
import { useAuth0, Auth0Provider } from "@auth0/auth0-react";
import { useEffect } from "react";

export const Auth0Context = createContext("");



export const Auth0ContextProvider = ({children}) => {
<Auth0Provider>
        domain="changeme"
        clientId="changeme"
        authorizationParams={{
          redirect_uri: window.location.origin
        }}
</Auth0Provider>

return (
    <Auth0Context.Provider value={{}}>
        {children}
    </Auth0Context.Provider>
)
};
