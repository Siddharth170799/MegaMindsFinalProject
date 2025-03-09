import "./App.css";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import DashBoard from "./Pages/DashBoard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewContext from "./context/NewContext";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [booksData, setBooksData] = useState([]);   //// here the context is being used and this is being wrapped in the context.provider
  return (          
    <NewContext.Provider value={{ booksData, setBooksData }}>   
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/DashBoard" element={<DashBoard />} />
        </Routes>
      </BrowserRouter>
    </NewContext.Provider>
  );
}

export default App;
