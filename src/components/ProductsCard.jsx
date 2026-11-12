import React, { useContext } from "react";
import { MyStore } from "../context/MyContext";

const ProductsCards = ({ product, isInCart }) => {
  let { setCartItems, incrementQuantity, decrementQuantity } =
    useContext(MyStore);

  const addToCart = () => {
    setCartItems((prev) => [...prev, { ...product, quantity: 1 }]);
    alert("Product added to cart");
  };

  return (
    <div className="bg-[#111827] border-2 cursor-pointer border-gray-800 rounded-2xl overflow-hidden hover:border-indigo-500 transition duration-300 group">
      {/* Product Image */}
      <div className="bg-white h-64 flex items-center justify-center p-6">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain group-hover:scale-105 transition duration-300"
        />
      </div>

      {/* Product Details */}
      <div className="p-5">
        {/* Category */}
        <p className="text-indigo-400 text-xs uppercase tracking-widest mb-2">
          {product.category}
        </p>

        {/* Title */}
        <h2 className="text-white text-lg font-semibold line-clamp-2">
          {product.title}
        </h2>

        {/* Description */}
        <p className="text-gray-400 text-sm mt-3 line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-4">
          <span className="text-yellow-400">★</span>
          <span className="text-white text-sm">{product.rating.rate}</span>
          <span className="text-gray-500 text-sm">
            ({product.rating.count} reviews)
          </span>
        </div>

        {/* Price and Cart */}
        <div className="flex items-center justify-between mt-5">
          <h3 className="text-2xl font-bold text-white">${product.price}</h3>

          {isInCart ? (
            <button className="w-fit bg-indigo-500 px-2 py-1 rounded-lg flex items-center justify-center gap-5">
              <span
                onClick={() => decrementQuantity(product.id)}
                className="text-3xl cursor-pointer"
              >
                {" "}
                -{" "}
              </span>{" "}
              <span className="text-xl">{isInCart.quantity}</span>{" "}
              <span
                onClick={() => incrementQuantity(product.id)}
                className="text-2xl cursor-pointer"
              >
                {" "}
                +{" "}
              </span>
            </button>
          ) : (
            <button
              onClick={addToCart}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsCards;
