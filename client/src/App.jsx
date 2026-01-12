import React from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from "./pages/HomePage"
import Shop from "./pages/Shop"
import AboutPage from "./pages/AboutPage"
import Contact from "./pages/Contact"
import ProductDetails from "./pages/productDetails"
import SearchResults from "./pages/SearchResults"
import LoginPage from "./pages/LoginPage"
import RegistrationPage from "./pages/RegistrationPage"
import Cart from "./pages/Cart"
import CheckOut from "./pages/CheckOut"

import Dashboard from "./pages/admin/Dashboard"
import AdminLayout from "./pages/admin/AdminLayout";
import Products from "./pages/admin/Products";
import Orders from "./pages/admin/Orders";
import Users from "./pages/admin/Users";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<HomePage />} />
          <Route path="/Shop" element={<Shop />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/search-result" element={<SearchResults />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<RegistrationPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />

          {/* admin */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Orders />} />
            <Route path="users" element={<Users />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
