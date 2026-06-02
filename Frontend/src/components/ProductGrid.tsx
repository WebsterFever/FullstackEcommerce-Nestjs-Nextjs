"use client";

import { useState } from "react";
import Link from "next/link";
import Card from "@/components/Card";
import { IProduct } from "@/types";

interface ProductGridProps {
  products: IProduct[];
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
}) => {
  const [selectedCategory, setSelectedCategory] =
    useState("all");

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter(
          (product: IProduct) =>
            product.category.name === selectedCategory
        );

  return (
    <>
      <div className="flex flex-wrap gap-3 p-6 justify-center">
        <button
          onClick={() => setSelectedCategory("all")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          All
        </button>

        <button
          onClick={() => setSelectedCategory("smartphone")}
          className="px-4 py-2 bg-gray-200 rounded-lg"
        >
          Smartphones
        </button>

        <button
          onClick={() => setSelectedCategory("monitor")}
          className="px-4 py-2 bg-gray-200 rounded-lg"
        >
          Monitors
        </button>

        <button
          onClick={() => setSelectedCategory("keyboard")}
          className="px-4 py-2 bg-gray-200 rounded-lg"
        >
          Keyboards
        </button>

        <button
          onClick={() => setSelectedCategory("mouse")}
          className="px-4 py-2 bg-gray-200 rounded-lg"
        >
          Mouse
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 place-items-center">
        {filteredProducts.map((product: IProduct) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
          >
            <Card {...product} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default ProductGrid;