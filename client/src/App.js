import './App.css';
// import { useEffect, useState } from "react";

import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./Header";
import Home from "./Home";
import Wines from "./Wines";
import Producers from "./Producers";
// import SearchBar from './SearchBar';
import WineDetails from './WineDetails';
import ProducerDetails from './ProducerDetails';
import Grapes from './Grapes';
import Regions from './Regions';
import BrowseByStyle from './BrowseByStyle';

import GlobalStyles from "./GlobalStyles";

const App = () => {


  return (
      <BrowserRouter>
      <GlobalStyles />
          <Header/>
          <Wrapper>
              <Routes>
                  <Route path="/" element={<Home/>} />
                  <Route path="/wines" element={<Wines/>} />
                  <Route path="/wines/:wineId" element={<WineDetails/>} />
                  <Route path="/producers" element={<Producers />} />
                  <Route path="/producers/:producerId" element={<ProducerDetails/>} />
                  <Route path="/grapes" element={<Grapes/>} />
                  <Route path="/regions" element={<Regions/>} />
                  <Route path="/styles" element={<BrowseByStyle/>} />
                  <Route path="*" element={<h1>404: Oops!</h1>} />
              </Routes>
          </Wrapper>
      </BrowserRouter>
  );
};


const Wrapper = styled.div`
  margin: auto;
`;

export default App;

