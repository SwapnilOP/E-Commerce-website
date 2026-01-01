import React from "react"
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import HomePage from "./pages/HomePage"
import Shop from "./pages/Shop"
import AboutPage from "./pages/AboutPage"
import Contact from "./pages/Contact"
import ProductDetails from "./pages/productDetails"
import SearchResults from "./pages/SearchResults"
import LoginPage from "./pages/LoginPage"
import RegistrationPage from "./pages/RegistrationPage"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<HomePage/>}/>
          <Route path="/Shop" element={<Shop/>}/>
          <Route path="/about" element={<AboutPage/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/product/:id" element={<ProductDetails/>} /> 
          <Route path="/search-result" element={<SearchResults/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<RegistrationPage/>}/>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
