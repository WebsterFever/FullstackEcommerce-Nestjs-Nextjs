import Link from "next/link";
import { ICardProps } from "@/types/propTypes";

const Card: React.FC<ICardProps> = ({
  id,
  name,
  description,
  price,
  imgUrl,
}) => {
  return (
    <Link href={`/products/${id}`}>
      <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2 cursor-pointer">
        
        {/* IMAGE */}
        <div className="relative overflow-hidden">
          <img
            src={imgUrl}
            alt={name}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* BADGE */}
          <span className="absolute top-4 left-4 bg-black text-white text-xs px-3 py-1 rounded-full tracking-wide uppercase">
            New
          </span>
        </div>

        {/* CONTENT */}
        <div className="p-5">
          
          {/* PRODUCT NAME */}
          <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-1">
            {name}
          </h2>

          {/* DESCRIPTION */}
          <p className="text-gray-500 text-sm mb-5 line-clamp-2">
            {description}
          </p>

          {/* PRICE + BUTTON */}
          <div className="flex items-center justify-between">
            
            <div className="flex flex-col">
              <span className="text-sm text-gray-400 line-through">
                $299.99
              </span>

              <span className="text-2xl font-bold text-black">
                ${price}
              </span>
            </div>

            <button className="bg-black text-white px-5 py-3 rounded-xl text-sm font-medium hover:bg-gray-800 transition-all duration-300">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;