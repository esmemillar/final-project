import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { FavoritesContextProvider } from './context/FavoritesContext';
import { Auth0Context, Auth0Provider } from '@auth0/auth0-react';
import { UserContextProvider } from './context/UserContext';
import { Auth0ContextProvider } from './context/Auth0Context';



//MOVE DOMAIN ETC TO A DOTENV
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FavoritesContextProvider>
      <Auth0Provider
        domain="dev-8iu7l4puxtie1wb0.us.auth0.com"
        clientId="b5B1rFjTV5vStO9oqw7nxauSUkbslCiv"
        authorizationParams={{
          redirect_uri: window.location.origin
        }}
      >
      {/* <Auth0ContextProvider> */}
        <UserContextProvider>
        <App />
        </UserContextProvider>
        {/* </Auth0ContextProvider> */}
      </Auth0Provider>
    </FavoritesContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
