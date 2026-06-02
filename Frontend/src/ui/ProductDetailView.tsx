"use client";

import { useAuth } from "@/context/AuthContext";
import { IProduct } from "@/types";

const ProductDetailView: React.FC<IProduct> = ({
  id,
  name,
  price,
  stock,
  description,
   imgUrl,
}) => {
  const { userData } = useAuth();

  const handleAddToCart = () => {
    if (!userData?.token) {
      alert("Inicia sesión para poder comprar");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    cart.push({
      id,
      name,
      price,
      stock,
      description,
       imgUrl,
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    // 🔥 THIS IS THE KEY LINE
    window.dispatchEvent(new Event("cartUpdated"));

    alert("Producto agregado");
  };

  return (
    <div className="max-w-6xl mx-auto p-6 mt-40">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        
        <div className="w-full h-[400px] bg-gray-100 rounded-xl overflow-hidden">
          <img
            src={imgUrl}
            alt={name}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-gray-800">{name}</h1>

          <p className="text-2xl font-semibold text-cyan-600">${price}</p>

          <p className="text-sm text-gray-500">
            {stock > 0 ? (
              <span className="text-green-600 font-medium">
                In Stock ({stock})
              </span>
            ) : (
              <span className="text-red-500 font-medium">
                Out of Stock
              </span>
            )}
          </p>

          <p className="text-gray-600 leading-relaxed">{description}</p>

          <button
            onClick={handleAddToCart}
            disabled={stock === 0}
            className="mt-4 bg-cyan-600 text-white py-3 rounded-lg hover:bg-cyan-700 transition disabled:bg-gray-400"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailView;