import React from 'react'
import NavBar from '../components/user/NavBar';
import ProductGrid from '../components/user/ProductGrid'
const Shop = () => {
  return (
    <div>
       {/* navbar */}
       <NavBar/>

       <div>
         <ProductGrid/>
       </div>
       
    </div>
  )
}

export default Shop
