import HomeView from "@/ui/HomeView";
import Image from "next/image";
import banner from "@/asset/banner.png";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* HERO SECTION */}
      <div className="relative w-full h-[350px] md:h-[450px]">

        {/* IMAGE */}
        <Image
          src={banner}
          alt="WSL Store Banner"
          fill
          className="object-cover"
          priority
        />

        {/* ✅ OVERLAY */}
        <div className="absolute inset-0 bg-black/30 z-10"></div>

        {/* TEXT CONTENT */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 mt-60">
          
          <h1 className="text-white text-3xl md:text-5xl font-bold">
            Welcome to WSL Store 🛍️
          </h1>

          <p className="text-gray-200 mt-3 text-sm md:text-lg">
            Discover amazing products at the best prices
          </p>

          <button className="mt-6 bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition">
            Shop Now
          </button>

        </div>
      </div>

      {/* PRODUCTS SECTION */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Featured Products
          </h2>

          <button className="text-sm text-blue-600 hover:underline">
            View All
          </button>
        </div>

        <HomeView />

      </div>

    </div>
  );
};

export default Home;