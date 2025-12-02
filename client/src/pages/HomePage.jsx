import React from "react";
import NavBar from "../components/User/NavBar";
import Banner from "../components/user/Banner";
import ProductGrid from "../components/user/ProductGrid";
import Footer from "../components/user/Footer";
const HomePage = () => {
  return (
    <div className="bg-purple-50 min-h-screen overflow-x-hidden">
      {/* Header */}
      <header>
        <NavBar />
      </header>

      {/* Main Content */}
      <main>
        {/* Promotional Banner */}
        <Banner/>

        {/* products grid */}
        <ProductGrid limit={8}/>
      </main>

      {/* footer */}
      <footer>
         <Footer/>
      </footer>
    </div>
  );
};

export default HomePage;
