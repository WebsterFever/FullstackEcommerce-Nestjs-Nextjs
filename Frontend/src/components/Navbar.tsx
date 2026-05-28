"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { userData, setUserData } = useAuth();

  // ✅ CART STATE
  const [cartCount, setCartCount] = useState(0);
  const [animate, setAnimate] = useState(false);

  const handleLogout = () => {
    setUserData(null);
  };

  useEffect(() => {
    const updateCart = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");

      setCartCount(cart.length);

      // 🔥 animation trigger
      setAnimate(true);
      setTimeout(() => setAnimate(false), 300);
    };

    updateCart();

    window.addEventListener("cartUpdated", updateCart);

    return () => {
      window.removeEventListener("cartUpdated", updateCart);
    };
  }, []);

  return (
    <nav className="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
      
      <div className="px-4">
        <div className="flex items-center justify-between">

          {/* LOGO */}
          <div className="flex shrink-0">
            <Link href="/" className="flex items-center">
              <img
                className="h-7 w-auto"
                src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                alt="logo"
              />
            </Link>
          </div>

          {/* DESKTOP MENU */}
         

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">

            {/* BURGER */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden flex flex-col gap-1"
            >
              <span className="w-6 h-0.5 bg-black"></span>
              <span className="w-6 h-0.5 bg-black"></span>
              <span className="w-6 h-0.5 bg-black"></span>
            </button>

            {!userData?.token ? (
              <>
                <Link
                  href="/register"
                  className="hidden md:inline-flex rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 hover:bg-gray-100"
                >
                  Sign up
                </Link>

                <Link
                  href="/login"
                  className="hidden md:inline-flex rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Login
                </Link>
              </>
            ) : (
              <>
                {/* CART */}
                <Link
                  href="/cart"
                  className="relative hidden md:inline-flex rounded-xl bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-200"
                >
                  Cart

                  {cartCount > 0 && (
                    <span
                      className={`absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full transition-transform ${
                        animate ? "scale-125" : "scale-100"
                      }`}
                    >
                      {cartCount}
                    </span>
                  )}
                </Link>

                {/* ✅ PROFILE */}
                <Link
                  href="/dashboard"
                  className="hidden md:inline-flex rounded-xl bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-200"
                >
                  Profile
                </Link>

                {/* ✅ ORDERS */}
                <Link
                  href="/dashboard/orders"
                  className="hidden md:inline-flex rounded-xl bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-200"
                >
                  Orders
                </Link>

                <button
                  onClick={handleLogout}
                  className="hidden md:inline-flex rounded-xl bg-red-500 px-3 py-2 text-sm font-semibold text-white hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden border-t bg-white px-4 py-4 space-y-4">

         

          {!userData?.token ? (
            <div className="flex flex-col gap-2 pt-2">
              <Link href="/register" className="text-center border rounded px-3 py-2">
                Sign up
              </Link>

              <Link href="/login" className="text-center bg-blue-600 text-white rounded px-3 py-2">
                Login
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-2 pt-2">

              {/* CART */}
              <Link
                href="/cart"
                className="relative text-center border rounded px-3 py-2 bg-gray-100"
              >
                Cart

                {cartCount > 0 && (
                  <span
                    className={`absolute top-1 right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full ${
                      animate ? "scale-125" : ""
                    }`}
                  >
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* PROFILE */}
              <Link
                href="/dashboard"
                className="text-center border rounded px-3 py-2"
              >
                Profile
              </Link>

              {/* ORDERS */}
              <Link
                href="/dashboard/orders"
                className="text-center border rounded px-3 py-2"
              >
                Orders
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white rounded px-3 py-2"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;