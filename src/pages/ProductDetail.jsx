import axios from "axios";
import {
  Star,
  ShoppingBag,
  Truck,
  ShieldCheck,
  RotateCcw,
  Minus,
  Plus,
  Heart,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

const ProductDetail = () => {
  const [singleProductData, setSingleProductData] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const getSingleProductData = async () => {
    try {
      setLoading(true);
      setError(false);

      let res = await axios.get(`https://fakestoreapi.com/products/${id}`);

      setSingleProductData(res.data);
    } catch (error) {
      console.log("Detail api error", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSingleProductData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !singleProductData.id) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-800">Product not found</h2>
        <button
          onClick={() => navigate("/")}
          className="mt-5 bg-indigo-600 text-white px-6 py-3 rounded-xl"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f8fc] py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition mb-8"
        >
          <ArrowLeft size={18} />
          Back to Products
        </button>

        {/* Main Product Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 p-6 sm:p-10 lg:p-14">
            {/* Product Image */}
            <div className="relative bg-[#f7f8fc] rounded-2xl min-h-[350px] lg:min-h-[550px] flex items-center justify-center p-8">
              <span className="absolute top-5 left-5 bg-indigo-100 text-indigo-700 text-xs font-semibold px-4 py-2 rounded-full uppercase tracking-wider">
                {singleProductData.category}
              </span>

              <button className="absolute top-5 right-5 bg-white p-3 rounded-full shadow-sm hover:text-red-500 transition">
                <Heart size={20} />
              </button>

              <img
                src={singleProductData.image}
                alt={singleProductData.title}
                className="w-full max-h-[450px] object-contain transition duration-500 hover:scale-105"
              />
            </div>

            {/* Product Information */}
            <div className="flex flex-col justify-center py-2">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-[2px]">
                Product Details
              </p>

              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mt-4">
                {singleProductData.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mt-5">
                <div className="flex items-center gap-1 bg-yellow-50 px-3 py-2 rounded-lg">
                  <Star size={17} className="fill-yellow-400 text-yellow-400" />

                  <span className="font-bold text-gray-800">
                    {singleProductData.rating?.rate}
                  </span>
                </div>

                <span className="text-sm text-gray-500">
                  {singleProductData.rating?.count} Customer Reviews
                </span>
              </div>

              {/* Price */}
              <div className="mt-8">
                <p className="text-sm text-gray-400 font-medium">Price</p>

                <h2 className="text-4xl font-bold text-gray-900 mt-1">
                  ${singleProductData.price}
                </h2>

                <p className="text-sm text-green-600 flex items-center gap-2 mt-3">
                  <CheckCircle2 size={17} />
                  In Stock and Ready to Ship
                </p>
              </div>

              {/* Description */}
              <div className="mt-8 border-t border-gray-100 pt-7">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Description
                </h3>

                <p className="text-gray-500 leading-7 text-[15px]">
                  {singleProductData.description}
                </p>
              </div>

              {/* Quantity */}
              <div className="mt-8">
                <p className="text-sm font-semibold text-gray-700 mb-3">
                  Quantity
                </p>

                <div className="flex items-center border border-gray-200 rounded-xl w-fit overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-100 transition"
                  >
                    <Minus size={17} />
                  </button>

                  <span className="px-5 font-semibold text-gray-800">
                    {quantity}
                  </span>

                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-gray-100 transition"
                  >
                    <Plus size={17} />
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <button
                className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-3 transition duration-300 shadow-lg shadow-indigo-100"
                onClick={() =>
                  console.log("Add to cart:", {
                    product: singleProductData,
                    quantity,
                  })
                }
              >
                <ShoppingBag size={20} />
                Add to Cart
              </button>

              {/* Additional Information */}
              <div className="grid grid-cols-3 gap-3 mt-8 pt-7 border-t border-gray-100">
                <div className="flex flex-col items-center text-center gap-2">
                  <Truck size={22} className="text-indigo-600" />
                  <p className="text-xs font-medium text-gray-500">
                    Free Delivery
                  </p>
                </div>

                <div className="flex flex-col items-center text-center gap-2">
                  <RotateCcw size={22} className="text-indigo-600" />
                  <p className="text-xs font-medium text-gray-500">
                    Easy Returns
                  </p>
                </div>

                <div className="flex flex-col items-center text-center gap-2">
                  <ShieldCheck size={22} className="text-indigo-600" />
                  <p className="text-xs font-medium text-gray-500">
                    Secure Payment
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Information */}
        <p className="text-center text-sm text-gray-400 mt-8">
          Quality products. Simple shopping. Better experience.
        </p>
      </div>
    </div>
  );
};

export default ProductDetail;
