"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { IProduct } from "@/types";
import { createOrders } from "@/services/ordersService";




const CartView = () => {
  const {userData} = useAuth();
  const [cart, setCart] = useState<IProduct[]>([]);

  useEffect(() => {
    const storedCart: IProduct[] = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCart(storedCart);
  }, []);

  const total = cart.reduce((acc, product) => {
    return acc + Number(product.price);
  }, 0);

  // ✅ UPDATED (IMPORTANT)
  const updateCart = (updatedCart: IProduct[]) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // 🔥 THIS LINE FIXES YOUR NOTIFICATION
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleRemoveFromCart = (id: number) => {
    const updatedCart = cart.filter((product) => product.id !== id);
    updateCart(updatedCart);
  };

  const handleClearCart = () => {
    updateCart([]);
  };

const handleCheckout = async () => {
  if (userData?.token) {
    const idProducts = cart.map((product: IProduct) => product.id);

    await createOrders(userData?.token, idProducts);

    localStorage.setItem("cart", "[]");
    setCart([]);
  }
};

  return (
    <div className="max-w-7xl mx-auto px-4 py-28">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
        My Cart
      </h1>

      {cart.length > 0 ? (
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* CART ITEMS */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((product) => (
              <div
                key={product.id}
                className="flex flex-col sm:flex-row gap-5 bg-white shadow-md rounded-2xl p-4 border"
              >
                <div className="w-full sm:w-40 h-40 bg-gray-100 rounded-xl overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {product.name}
                    </h2>

                    <p className="text-gray-500 mt-2 line-clamp-2">
                      {product.description}
                    </p>

                    <p className="mt-3 text-cyan-600 font-bold text-lg">
                      ${product.price}
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      onClick={() => handleRemoveFromCart(product.id)}
                      className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* SUMMARY */}
          <div className="bg-white shadow-md rounded-2xl p-6 h-fit border">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Order Summary
            </h2>

            <div className="flex justify-between text-gray-600 mb-2">
              <span>Items</span>
              <span>{cart.length}</span>
            </div>

            <div className="flex justify-between text-gray-600 mb-4">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full mt-6 bg-cyan-600 text-white py-3 rounded-xl font-semibold hover:bg-cyan-700 transition"
            >
              Buy Now
            </button>

            <button
              onClick={handleClearCart}
              className="w-full mt-3 bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-300 transition"
            >
              Clear Cart
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-2xl p-10 text-center border">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Your cart is empty
          </h2>

          <p className="text-gray-500 mb-6">
            You have not added any products yet.
          </p>

          <Link
            href="/"
            className="inline-block bg-cyan-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-cyan-700 transition"
          >
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartView;