import React, { useState } from "react";
import { Link,useNavigate} from "react-router-dom";
import { FaSearch, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";

const NavBar = () => {
  const token = localStorage.getItem("token");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [inputVal, setInputVal] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInputVal(e.target.value);
  };

  const handleEnterKey = (e) => {
     if(e.key==='Enter'){
        console.log("enter key pressed");
        navigate(`/search-result?keyword=${inputVal}`);
     }
  }

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="flex items-center justify-between h-16 px-4 sm:px-8">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-purple-800 tracking-wide">
          ShopEase
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center space-x-8 font-medium text-gray-700">
          <li><Link to="/" className="hover:text-indigo-600 transition">Home</Link></li>
          <li><Link to="/shop" className="hover:text-indigo-600 transition">Shop</Link></li>
          <li><Link to="/about" className="hover:text-indigo-600 transition">About</Link></li>
          <li><Link to="/contact" className="hover:text-indigo-600 transition">Contact</Link></li>
          {!token && (
            <li><Link to="/login" className="hover:text-indigo-600 transition">Login</Link></li>
          )}
          {token && (
              <button 
                 className=" px-2 py-0.5 border rounded-lg hover:bg-gray-200"
                 onClick={()=>{
                    localStorage.removeItem("token");
                    navigate("/");
                 }}
              >
                logout
              </button>
          )}
        </ul>

        {/* Search Bar (desktop/tablet) */}
        <div className="hidden lg:flex items-center h-10 w-[28%] bg-gray-100 rounded-full px-4 gap-3 border border-gray-200 focus-within:ring-2 ring-indigo-300 transition">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search products..."
            value={inputVal}
            className="w-full bg-transparent outline-none text-gray-700"
            onChange={handleInputChange}
            onKeyDown={handleEnterKey}
          />
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4">

          {/* Mobile Search Toggle */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="lg:hidden text-gray-600 text-xl"
          >
            <FaSearch />
          </button>

          {/* Cart */}
          <button className="text-gray-700 text-2xl relative hover:text-indigo-600 transition">
            <FaShoppingCart />
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      {showSearch && (
        <div className="lg:hidden flex items-center border-t border-b border-gray-200 p-3 bg-gray-50">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full bg-transparent outline-none text-gray-700"
            value={inputVal}
            onChange={handleInputChange}
            onKeyDown={handleEnterKey}
          />
        </div>
      )}

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white text-gray-800 shadow-md border-t border-gray-100 text-center space-y-4 py-4">
          <Link to="/" className="block hover:text-indigo-600 transition">Home</Link>
          <Link to="/shop" className="block hover:text-indigo-600 transition">Shop</Link>
          <Link to="/about" className="block hover:text-indigo-600 transition">About</Link>
          <Link to="/contact" className="block hover:text-indigo-600 transition">Contact</Link>
          {!token && (
            <Link to="/login" className="hover:text-indigo-600 transition">Login</Link>
          )}
          {token && (
              <button 
                 className=" px-2 py-0.5 border rounded-lg hover:bg-gray-200"
                 onClick={()=>{
                    localStorage.removeItem("token");
                    navigate("/");
                 }}
              >
                logout
              </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
