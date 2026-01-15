import { useState,useEffect } from "react";
import NavBar from "../components/user/NavBar";
import Banner from "../components/user/Banner";
import ProductGrid from "../components/user/ProductGrid";
import Footer from "../components/user/Footer";

const HomePage = () => {
  const [products,setProducts] = useState([]);
  const [totalPages,setTotalPages] = useState(1);
  useEffect(() => {
     const fetchProducts = async()=>{
        try{
           const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products/getProducts?page=1&limit=16`);
           if(!res.ok){
               throw new Error("failed to fetch products");
           }
           const data = await res.json();
           setProducts(data.products);
           setTotalPages(data.totalPages);
        }
        catch(error){
           console.error(error);
        }
     }
      fetchProducts();
  }, [])
  
  return (
    <div className="bg-gray-50 min-h-screen overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50">
        <NavBar/>
      </header>

      {/* Main Content */}
      <main className="pt-2">

        {/* Hero Banner */}
        <section className="w-full">
          <Banner/>
        </section>

        {/* Product Grid Section */}
        <section className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6">
            Featured Products
          </h2>
          <ProductGrid products={products}/>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-8">
        <Footer />
      </footer>
    </div>
  );
};

export default HomePage;
