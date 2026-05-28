import Card from "@/components/Card";
import { productsToPreload } from "@/lib/mockupProducts";

const CardList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {productsToPreload.map((product) => {
        return (
          <Card
            key={product.id}
            {...product}
            price={Number(product.price)}
          />
        );
      })}
    </div>
  );
};

export default CardList;