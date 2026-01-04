import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from "../components/user/NavBar";
import CartItems from '../components/user/CartItems';

const Cart = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [items,setItems] = useState([]);
    useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchCartItems = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/cart/get-cart-items",{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setItems(data.items);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      }
    };
 
    fetchCartItems();
  }, [token, navigate]);

  return (
    <div>
      <NavBar />
      <div>
         <CartItems items={items} setItems={setItems}/>
      </div>
    </div>
  )
}

export default Cart
