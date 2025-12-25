import { FaShoppingCart, FaHeart } from "react-icons/fa";

const ProductGrid = ({ products = [] }) => {
  return (
    <section className="bg-purple-50 py-10 px-4 sm:px-8 lg:px-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden relative"
          >
            <button className="absolute top-3 right-3 z-20 text-gray-600 border rounded-full p-2 bg-amber-50 hover:text-pink-600">
              <FaHeart />
            </button>

            <div className="m-2 flex items-center justify-center h-64">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-purple-700 font-medium">{product.price}</p>

              <button className="mt-3 w-full bg-purple-700 text-white py-2 rounded flex items-center justify-center gap-2">
                <FaShoppingCart />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
