"use client";

import { useAuth } from "@/context/AuthContext";
import { createOrders, getOrders } from "@/services/ordersService";
import { IOrder, IProduct } from "@/types";
import { useEffect, useState } from "react";

const OrdersView = () => {
    const { userData } = useAuth();
    const [data, setData] = useState<IOrder[]>([]);
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState<IProduct[]>([]);

    const handleCheckout = async (products: IProduct[]) => {
        if (userData?.token) {
            const idProducts = products.map((product) => product.id);

            await createOrders(userData.token, idProducts);

            localStorage.setItem("cart", "[]");
            setCart([]);
        }
    };

    const handleGetOrders = async () => {
        try {
            if (userData?.token) {
                const orders = await getOrders(userData.token);
                setData(orders);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleGetOrders();
    }, []);

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">

            {/* TITLE */}
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
                My Orders
            </h1>
            <p className="text-gray-500 mb-8">
                Check your order history and reorder easily.
            </p>

            {loading && (
                <p className="text-center text-gray-500">Loading...</p>
            )}

            {!loading && data.length === 0 && (
                <div className="bg-white p-6 rounded-xl shadow text-center">
                    No orders yet.
                </div>
            )}

            <div className="space-y-6">
                {data.map((order) => {
                    const total = order.products.reduce(
                        (acc, p: any) => acc + (p.price || 0),
                        0
                    );

                    return (
                        <div
                            key={order.id}
                            className="bg-white rounded-2xl shadow-md border overflow-hidden"
                        >
                            {/* HEADER */}
                            <div className="flex flex-col md:flex-row md:justify-between md:items-center p-4 border-b gap-4">

                                <div>
                                    <p className="font-semibold text-gray-800">
                                        Order #{order.id}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Placed on {new Date(order.date).toLocaleDateString()}
                                    </p>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <p className="text-xs text-gray-400">TOTAL</p>
                                        <p className="font-bold text-gray-800">
                                            ${total}
                                        </p>
                                    </div>

                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-semibold ${order.status === "approved"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-gray-200 text-gray-700"
                                            }`}
                                    >
                                        {order.status === "approved"
                                            ? "Approved"
                                            : "Pending"}
                                    </span>
                                </div>
                            </div>

                            {/* PRODUCTS */}
                            <div className="p-4 space-y-4">
                                {order.products.map((product: any) => (
                                    <div
                                        key={product.id}
                                        className="flex items-center justify-between bg-gray-50 p-3 rounded-xl"
                                    >
                                        {/* LEFT */}
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-16 h-16 object-cover rounded-lg"
                                            />

                                            <div>
                                                <p className="font-semibold text-gray-800">
                                                    {product.name}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Unit price: ${product.price || 0}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Quantity: {product.quantity || 1}
                                                </p>
                                            </div>
                                        </div>

                                        {/* RIGHT */}
                                        <div className="text-right">
                                            <p className="text-sm text-gray-400">Subtotal</p>
                                            <p className="font-semibold text-gray-800">
                                                ${(product.price || 0) * (product.quantity || 1)}
                                            </p>
                                        </div>
                                    </div>
                                ))}

                                {/* FOOTER */}
                                <div className="flex justify-between items-center mt-4">
                                    <p className="text-sm text-gray-500">
                                        {order.products.length} item(s)
                                    </p>

                                    <button
                                        onClick={() => handleCheckout(order.products)}
                                        className="bg-cyan-600 text-white px-4 py-2 rounded-full text-sm hover:bg-cyan-700 transition"
                                    >
                                        Buy again
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default OrdersView;

