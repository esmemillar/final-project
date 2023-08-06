import './App.css';
import { useEffect, useState } from "react";

import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./Header";
import Home from "./Home";
import Wines from "./Wines";
import Producers from "./Producers";
import SearchBar from './SearchBar';

const App = () => {

  //   useEffect(() => {
  //   fetch('/hello')
  //   .then(res => res.json())
  //   .then(data => console.log(data));
  // }, [])

  const [wines, setWines] = useState([]);

  useEffect(() => {
      fetch("/wines")
          .then((res) => res.json())
          .then((data) => {
              console.log(data.data);
              setWines(data.data);
          })
          .catch(error => {
              console.log("error");
            })
  }, []);

  return (
      <BrowserRouter>
          <Header/>
          <SearchBar 
          wines={wines}
          handleSelect={(wine) => {
            console.log(wine)
          }}
          />
          <Wrapper>
              <Routes>
                  <Route path="/" element={<Home/>} />
                  <Route path="/wines" element={<Wines/>} />
                  <Route path="/producers" element={<Producers />} />
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

// function App() {

//   useEffect(() => {
//     fetch('/hello')
//     .then(res => res.json())
//     .then(data => console.log(data));
//   }, [])

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
