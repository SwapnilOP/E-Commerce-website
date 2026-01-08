import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProductGrid = ({ products = [] }) => {
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };


  return (
    <section className="bg-purple-50 py-10 px-4 sm:px-8 lg:px-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (

          <Link
            onClick={goToTop}
            key={product._id}
            to={`/product/${product._id}`}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden relative"
          >
            <div className="m-2 flex items-center justify-center h-64">
              <img
                src={product.images}
                alt={product.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-purple-700 font-medium text-xl">₹{product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
