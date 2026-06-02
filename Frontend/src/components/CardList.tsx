// import Card from "@/components/Card";
// import { getAllProducts } from "@/services/productService";
// import Link from "next/link";

// const CardList = async () => {
//   const productsToPreLoad = await getAllProducts();
//   console.log(productsToPreLoad);

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 place-items-center">
//       {productsToPreLoad.map((product) => {
//         return (
//           <Link key={product.id} href={`/product/${product.id}`}>
//             <Card {...product} />
//           </Link>
//         );
//       })}
//     </div>
//   );
// };

// export default CardList;


import { getAllProducts } from "@/services/productService";
import ProductGrid from "@/components/ProductGrid";

const CardList = async () => {
  const productsToPreLoad = await getAllProducts();

  return (
    <ProductGrid products={productsToPreLoad} />
  );
};

export default CardList;