/* eslint-disable @next/next/no-img-element */

import { ICardProps } from "@/types/propTypes";

const Card: React.FC<ICardProps> = ({ name, price, image, description, stock }) => {
  return (
    <div className="flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg overflow-hidden hover:shadow-lg transition w-full max-w-sm">
      
      {/* Image */}
      <div className="h-64 overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover hover:scale-105 transition duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between flex-1">
        
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-slate-800 text-lg font-semibold">
              {name}
            </h3>
            <p className="text-cyan-600 font-bold">
              ${price}
            </p>
          </div>

          {/* ✅ REAL DESCRIPTION */}
          <p className="text-slate-600 text-sm">
            {description}
          </p>
        </div>

  
      </div>
    </div>
  );
};

export default Card;